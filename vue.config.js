
module.exports = {
  productionSourceMap: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  chainWebpack: config => {

      
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer: {
    disableHostCheck: true,
    hot: true,
    inline: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
