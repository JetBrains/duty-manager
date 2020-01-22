let jsdomWindow
if (typeof window === 'undefined') {
  const {JSDOM} = require('jsdom')
  const {window} = new JSDOM('', {url: 'http://localhost'})
  for (const name of Object.getOwnPropertyNames(window)) {
    if (name in global) {
      continue
    }

    global[name] = window[name]
  }
  jsdomWindow = window
}

module.exports = {
  getStyles: () =>
    [...(jsdomWindow?.document.getElementsByTagName('style') ?? [])]
      .map(element => element.textContent)
      .join('\n\n'),
}
