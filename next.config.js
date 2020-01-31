const path = require('path')
const {config, loaders} = require('@jetbrains/ring-ui/webpack.config')
require('dotenv').config()

const {SPACE_URL, SPACE_CLIENT_ID} = process.env

module.exports = {
  cssModules: true,
  env: {SPACE_URL, SPACE_CLIENT_ID},
  webpack(baseConfig) {
    loaders.cssLoader.include.push(
      path.resolve(__dirname, 'components'),
      path.resolve(__dirname, 'pages'),
    )
    baseConfig.module.rules.push(...config.module.rules)
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
    return baseConfig
  },
  target: 'serverless',
  experimental: {reactMode: 'concurrent'},
}
