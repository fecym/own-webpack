// loader 就是一个函数，接首一个 source
// less-loader 就是匹配到 less 文件，用less 转换一下
const less = require('less')
function loader(source) {
  let css
  // 同步的方法，但是有回调 ç∫˜µ≤≥≈≤≈≤≈≤≈¬˚∆˙©ƒ∂ßœ∑´®†¥¨˚˙
  less.render(source, (err, r) => {
    css = r.css
  })
  console.log("less-loader -> css", css)
  return css
}

module.exports = loader