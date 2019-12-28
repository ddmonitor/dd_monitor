const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  pwa: {
    name: "DD大屏",
    workboxPluginMode: 'InjectManifest',
    workboxOptions: { 
      swSrc: 'src/sw.js',
    }
  },
  chainWebpack: config => {

      
  },
}