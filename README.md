# style-inject-webpack-plugin
A plugin for webpack to inject CSS assets to style.

## Install
``` shell
$ yarn add style-inject-webpack-plugin
```

## Usage
`webpack.config.js`
``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleInjectWebpackPlugin = require('style-inject-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new StyleInjectWebpackPlugin(),
  ],
}
```
