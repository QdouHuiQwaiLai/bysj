const path = require('path');
const os = require('os');
const partsConfig = require('./webpack.parts');
const webpack = require('webpack');
const HappyPack = require('happypack');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});


module.exports = mode => ({
  entry: partsConfig.getEntryConfig(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[chunkhash].js', // 使用时候注释掉热更新
  },
  mode: mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/cjs/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/cjs/react-dom.production.min.js'),
    },
  },
  devtool: 'cheap-module-source-map',
  devServer: partsConfig.getDevServerConfig(),
  module: {
    rules: [
      partsConfig.getTsxConfig(),
      {
        test: [/\.tsx?$/],
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
    ]
  },
  plugins: [
    ...partsConfig.getPageConfig(),
    new webpack.HotModuleReplacementPlugin(), // 不能使用chunkhash
    new InlineSourcePlugin(),
    new HappyPack({
      id: 'tsx',
      //  多少个线程
        threads: happyThreadPool.size,
        loaders: ['babel-loader', 'awesome-typescript-loader']
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      //  这里导入 manifest 配置内容
      manifest: require('./manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './dist/*.dll.js'),
    }),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
})