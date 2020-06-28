class EmitPlugin {
  apply(compiler) {
    // 1. 要知道那个生命周期适合你
    // 2. 要知道生命周期的执行顺序
    console.log(1);
    compiler.hooks.emit.tap('EmitPlugin', function() {
      console.log('emit-plugin');
    })
  }
}

module.exports = EmitPlugin