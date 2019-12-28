import Vue from 'vue';

import './plugins/axios';
import './plugins/element.js';
import i18n from './plugins/i18n';

import router from './router';
import store from './store';
import './registerServiceWorker';

import "@/styles/main.scss";

Vue.config.productionTip = false;

import App from './App.vue';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
