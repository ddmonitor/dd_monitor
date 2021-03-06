import "array-proto-ext";
import 'reflect-metadata';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/styles/main.scss';
import "@fortawesome/fontawesome-free/css/all.css";

import './plugins/element';
import './plugins/axios';
import i18n from './plugins/i18n';
import "./plugins/audio";

import "@/components/index";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
