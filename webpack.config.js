const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const { EnvironmentPlugin, DefinePlugin } = require('webpack');

require('dotenv').config();

const production = process.NODE_ENV;

const plugins = [
  new HTMLPlugin({
    template: `${__dirname}/src/index.html`,
  }),
  new ExtractPlugin('bundle.[hash].css'),
  new EnvironmentPlugin(['NODE_ENV']),
  new DefinePlugin({
    __AUTH_URL__: JSON.stringify(process.env.AUTH_URL),
    __API_URL__: JSON.stringify(process.env.API_URL),
    __DEBUG__: JSON.stringify(!production),
  }),
];

module.exports = {
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [`${__dirname}/src/style`],
              },
            },
          ],
        }),
      },
    ],
  },
};
