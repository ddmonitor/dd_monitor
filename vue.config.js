const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  productionSourceMap: false,

  pwa: {
    name: "DD大屏",
    themeColor: "#49c8f0",
    manifestOptions: {

    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: { 
      swSrc: 'src/sw.js',
    }
  },

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
