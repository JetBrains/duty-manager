const path = require('path')
const {config, loaders} = require('@jetbrains/ring-ui/webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv').config()

const {SPACE_URL, SPACE_CLIENT_ID} = process.env

module.exports = {
  cssModules: true,
  env: {SPACE_URL, SPACE_CLIENT_ID},
  webpack(baseConfig) {
    baseConfig.plugins.push(new MiniCssExtractPlugin())
    loaders.cssLoader.include.push(
      path.resolve(__dirname, 'components'),
      path.resolve(__dirname, 'pages'),
    )
    loaders.cssLoader.use.splice(0, 1, MiniCssExtractPlugin.loader)
    baseConfig.module.rules.push(...config.module.rules, {
      test: /\.graphql$/,
      loader: 'graphql-import-loader',
    })
    baseConfig.externals = (baseConfig.externals || [])
      .map(external =>
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
      .concat(['jsdom'])
    return baseConfig
  },
  target: 'serverless',
  experimental: {reactMode: 'concurrent'},
}
