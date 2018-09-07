// 如果项目的 (和 package.json 同级的) 根目录中存在vue.config.js这个文件，那么它会被 @vue/cli-service 自动加载
// 官方文档：https://cli.vuejs.org/zh/config/#vue-config-js
const appConfig = require('./src/app.config')

module.exports = {
  baseUrl: '/Hybrid-H5/', // 部署应用时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  outputDir: 'dist', // build 后生成的生产环境构建文件的目录
  lintOnSave: true, // 是否在保存的时候使用 `eslint-loader` 进行检查。
  productionSourceMap: false, // 是否为生产环境构建生成 productionSourceMap
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },
  css: {
    sourceMap: false, // Enable CSS source maps.
  },
  // Configure Webpack's dev server.
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // devServer.proxy 可以是一个指向开发环境 API 服务器的字符串
    ...(process.env.API_BASE_URL
      ? // Proxy API endpoints to the production base URL.
        { proxy: { '/api': { target: process.env.API_BASE_URL } } }
      : // Proxy API endpoints a local mock API.
        { before: require('./tests/mock-api') }),
  },
}
