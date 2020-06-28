class DonePlugin {
  apply(compiler) {
    console.log(2);
    compiler.hooks.done.tap('DonePlugin', () => {
      console.log('done-plugin');
    })
  }
}

module.exports = DonePlugin