// babel.config.js
module.exports = {
  presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',   
  ],
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"]
  ]
};