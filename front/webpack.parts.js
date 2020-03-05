const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const threadLoader = require('thread-loader');

// 获取入口
exports.getEntryConfig = () => ({
  'pc': ['./src/index.tsx', './src/dev.js'],
  'm': ['./src/index.tsx', './src/dev.js']
})

// 页面配置
exports.getPageConfig = () => ([
  new HtmlWebPackPlugin({
    template: 'src/template/pc.html',
    filename: 'pc.html',
    inlineSource: 'runtime~.+\\.js',
    inject: true,
    // chunks: ['[name].[chunkhash].js'],
  }),
  new HtmlWebPackPlugin({
    template: 'src/template/m.html',
    filename: 'm.html',
    inlineSource: 'runtime~.+\\.js',
    inject: true,
    // chunks: ['[name].[chunkhash].js'],
  })
])


// 获取devServer 相关的配置
exports.getDevServerConfig = ({host = '127.0.0.1', port = 3000} = {}) => ({
  contentBase: path.join(__dirname, './', './dist'),
  // stats: 'errors-only',
  // publicPath: './',
  host,
  port,
  hot: true,
  open: true,
  overlay: true,
  stats: {
    color: true
  },
  proxy: {
    // TODO
  }
})

// 解析tsx
exports.getTsxConfig = () => ({
  test: /\.tsx$/,
  exclude: /node_modules/, // 排除
  use: [
    // {
    //   // 优化速度
    //   loader: 'thread-loader',
    // },
    {
      // loader  是 babel
      loader: 'babel-loader',
      options: {
        // babel  转义的配置选项
        babelrc: false,
        presets: [
        //  添加 preset-react
          require.resolve('@babel/preset-react'),
          [require.resolve('@babel/preset-env'), {modules: false}]
        ],
        cacheDirectory: true,
        plugins: [
          ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
          ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"]
        ],
      }
    },
    {
      loader: 'awesome-typescript-loader',
    }
  ]
})

// 解析css
// exports.getCssConfig = () => ({
//   test: /\.css$/,
//   exclude: /node_modules/, // 排除
//   use: [
//     {
//       // loader  是 babel
//       loader:'style-loader',
//     },
//   ]
// })

// esLint配置