const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const config = {
  mode: "development",
  cache: false,
  entry: {
    index: "./src/index.jsx",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|bpmn|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true,
    compress: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
      cache: false
    }),
  ],
};

module.exports = config;