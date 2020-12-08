
module.exports = {
  //webpack配置
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },

  //警告 webpack 的性能提示

  // 解决跨域请求问题 CORS
  devServer: {
    // host: localhost,
    host: "0.0.0.0",
    port: 8080,
    // open: true, // 自动打开浏览器
    // https: true,
    hotOnly: true, // 热更新
    // 需要转发到的后端服务器地址 经过此配置后只需要访问 前端地址即可 如 localhost:8080
    // proxy: 'http://localhost:8020' // 开发环境
    proxy: 'http://47.99.65.198:8020' // 生产环境
  },

  publicPath: process.env.NODE_ENV === 'production' ? './' : './',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
