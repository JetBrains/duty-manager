const {config, loaders} = require('@jetbrains/ring-ui/webpack.config')
const withCSS = require('@zeit/next-css')
require('dotenv').config()

const {CLIENT_ID} = process.env

module.exports = withCSS({
  cssModules: true,
  env: {CLIENT_ID},
  webpack(baseConfig) {
    baseConfig.module.rules = baseConfig.module.rules.concat(
      config.module.rules.filter(rule => rule !== loaders.cssLoader),
    )
    baseConfig.externals = (baseConfig.externals || []).map(external =>
      typeof external === 'function'
        ? (context, request, callback) => {
            if (
              /(@jetbrains\/ring-ui\/components\/|react-virtualized)/.test(
                request,
              )
            ) {
              callback()
            } else {
              external(context, request, callback)
            }
          }
        : external,
    )
    baseConfig.externals.push('jsdom')
    return baseConfig
  },
  target: 'serverless',
})
