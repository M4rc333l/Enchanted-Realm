const { defineConfig } = require('@vue/cli-service')

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin(
        {
          patterns: [
            {from: 'src'}
          ],
        },
      )
    ]
  }
})
