
module.exports = {
  productionSourceMap: true,
  /**
   * @param {import("webpack-chain")} config
   */
  chainWebpack: config => {
    config.devtool("eval-source-map");
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'DD Monitor';
        return args;
      });
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
