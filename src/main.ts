import "array-proto-ext";
import 'reflect-metadata';

import Vue from 'vue';

import './plugins/axios';
import './plugins/element';
import i18n from './plugins/i18n';

import router from './router';
import store from './store';
import './registerServiceWorker';

import "@/styles/main.scss";
import "@/components/index";


Vue.config.productionTip = false;
import App from './App.vue';
(window as any).$app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');



