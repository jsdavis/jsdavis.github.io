const path = require('path');
const glob = require('glob-fs')({ gitignore: true });
const fs = require('fs');
const yaml = require('js-yaml');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

const data_files = glob.readdirSync('_data/*.yml');
let config = {};

for (let file of data_files) {
  let name = path.basename(file, '.yml');
  config[name] = yaml.safeLoad(fs.readFileSync(file));
}

console.log(config);

module.exports = {
  mode: NODE_ENV,
  entry: './_src/assets/js/main.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [{
          test: /\.html$/,
          use: [
            { loader: 'html-loader' },
            {
              loader: 'liquid-loader',
              options: {
                data: { site: { data: config } }
              }
            }
          ]
      }]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, '_layouts', 'resume.html')
    })
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: true
  }
};
