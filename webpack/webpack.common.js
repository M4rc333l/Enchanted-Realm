const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['./src/scripts/game.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'Enchanted Realm', template: 'src/index.html' }),    
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src',globOptions: {
          ignore: ["**/index.html"]
        } },
      ]
    })
  ]
}
