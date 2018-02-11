const path = require('path')
const webpack = require('webpack')

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')

const srcDir = path.resolve(__dirname, '../src')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)

  // Extend it as you need.

  config.resolve.modules.push(srcDir)
  return config
}
