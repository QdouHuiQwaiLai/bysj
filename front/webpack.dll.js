// webpack.config.dll.js
const webpack = require('webpack');
//  这里是第三方依赖库
const vendors = ['react', 'react-dom'];
module.exports = {
  mode: 'production',
  entry: {
    //  定义程序中打包公共文件的入口文件 vendor.js
    vendor: vendors
  },
  output: {
    filename: '[name].[chunkhash].dll.js',
    //  这里是使用将 verdor  作为 library  导出，并且指定全局变量名字是 [name]_[chunkhash]
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      //  这里是设置 mainifest.json  路径
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
};