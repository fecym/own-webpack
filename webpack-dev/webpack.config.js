const path = require('path')
const EmitPlugin = require('./plugins/emitPlugin')
const DonePlugin = require('./plugins/donePlugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, 'loaders', 'style-loader.js'),
          path.resolve(__dirname, 'loaders', 'less-loader.js'),
        ]
      }
    ]
  },
  plugins: [
    // 一般情况的插件的执行顺序是不一定的（考虑异步情况）默认按顺序执行
    // 也可能出现多个插件监听了同一个事件，那就是谁在前谁先执行
    new DonePlugin(),
    new EmitPlugin(),
  ]
}