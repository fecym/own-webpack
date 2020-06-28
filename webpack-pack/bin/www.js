#! /usr/bin/env node

const path = require('path')

// 以当前执行目录 产生一个绝对路径
const configPath = path.resolve('webpack.config.js')

// 自动的引用 webpack 配置
const config = require(configPath)
// console.log(config);

// 通过此配置文件打包
const Compiler = require('../src/Compiler')

// 实力话打包器
const compiler = new Compiler(config)

// 确保传递 plugins 了
if (Array.isArray(config.plugins)) {
  // 多个插件依次执行，参数是 complier
  config.plugins.forEach(plugin => {
    plugin.apply(compiler)
  })
}

// 调用钩子
compiler.hooks.entryOption.call()

compiler.run()


