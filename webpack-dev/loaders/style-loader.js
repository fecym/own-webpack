// loader 就是一个函数，接首一个 source
function loader(source) {
  // 创建一个 style标签
  let code = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
  // console.log("style-loader -> code", code)
  return code.replace(/\\/g, '\\\\')   // "\n" => "\\n"
}

module.exports = loader