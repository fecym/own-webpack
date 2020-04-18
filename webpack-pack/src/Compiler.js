const fs = require('fs')
const path = require('path')
// 把源代码转换成 ast，@babel/core 内置的
// @babel/core transform = traverse+generator
const babylon = require('babylon')
// 遍历树，因为是 es5 模块，所以需要default
const traverse = require('@babel/traverse').default
// 生成树
const generator = require('@babel/generator').default

const template = fs.readFileSync(path.resolve(__dirname, './template.ejs'), 'utf8')
// 这个文件用来 通过配置文件进行打包的
class Compiler {
  constructor(config) {
    this.config = config
    // 主入口文件的名字
    this.entryName;
    // 需要的所有的模块
    this.modules = {}
    this.entry = this.config.entry  // ./src/index.js
    // 获取当前运行的命令
    this.root = process.cwd()
    this.template = template
  }
  readSource(p) {
    return fs.readFileSync(p, 'utf8')
  }
  parser(source, parentPath) {
    // 对 source 进行 ast 源码解析
    // 把 require 变成 __webpack_require__
    // 需要把路径对应关系处理好，在字文件夹下面引入的我们需要添加上他的父文件目录
    // console.log(parentPath, '????');
    // require('./a') => __webpack_require__(parentPath + './a.js')
    // 1. 把源代码转换成 ast
    // 2. 遍历树、修改树
    // 3. 生成新的代码
    const ast = babylon.parse(source)
    // 存放所有的代码依赖
    const dependencies = []
    traverse(ast, {
      CallExpression(p) {
        const node = p.node
        // console.log("Compiler -> CallExpression -> node", node)
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          const refPath = node.arguments[0].value + (path.extname(node.arguments[0].value) ? '' : '.js')
          // 拼上一个父路径
          const modulePath = './' + path.join(parentPath, refPath)
          dependencies.push(modulePath)
          node.arguments[0].value = modulePath
        }
      }
    })
    const r = generator(ast)
    // console.log(r.code);
    return {
      code: r.code,
      dependencies
    }
  }
  buildModule(modulePath, isMain) {
    // 收集依赖
    const source = this.readSource(modulePath)
    // console.log(source);
    // 获取相对路径，因为编译完之后模块的id也是以相对路径为主的
    const relativeModulePath = './' + path.relative(this.root, modulePath)
    if (isMain) {
      this.entryName = relativeModulePath
    }
    // 转换我们的源代码
    const {code,dependencies} = this.parser(source, path.dirname(relativeModulePath))
    // console.log("Compiler -> buildModule -> dependencies", dependencies)
    this.modules[relativeModulePath] = code
    // 加载依赖，递归收集每个模块的依赖
    dependencies.forEach(dep => {
      this.buildModule(path.join(this.root, dep))
    })
  }
  run() {
    // 1. 打包 找到入口 和 所有的依赖
    // 从入口开始
    this.buildModule(path.join(this.root, this.entry), true)
    console.log(this.modules);
    // require = __webpack_require__
    // 2. 使用模版 和 数据渲染一个打包后的文件
    this.emit()
  }
  emit() {
    // 通过数据渲染对应的模版
    const ejs = require('ejs')
    const renderStr = ejs.render(this.template, {
      entryName: this.entryName,
      modules: this.modules
    })
    // 输出的文件
    this.assets = {}  // 所有要输出的文件
    const filename = this.config.output.filename
    // 将要输出的文件放到 一个对像中处理
    this.assets[filename] = renderStr
    this.assets['index.html'] = 'hello'
    const p = this.config.output.path || path.resolve('dist')
    // 最终输出结果
    Object.keys(this.assets).forEach(filename => {
      const outputPath = path.join(p, filename)
      fs.writeFileSync(outputPath, this.assets[filename])
    })
  }
}

module.exports = Compiler