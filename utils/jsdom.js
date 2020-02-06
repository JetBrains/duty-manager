let jsdomWindow
if (typeof window === 'undefined') {
  const {JSDOM} = require('jsdom')
  const {window} = new JSDOM('', {url: 'http://localhost'})
  for (const name of Object.getOwnPropertyNames(window)) {
    if (name in global || name === 'XMLHttpRequest') {
      continue
    }

    global[name] = window[name]
  }
  window.isJSDOM = true
  jsdomWindow = window
}

module.exports = {
  getStyles: () =>
    [...(jsdomWindow?.document.getElementsByTagName('style') ?? [])]
      .map(element => element.textContent)
      .join('\n\n'),
}
