import Vue, { PluginObject } from 'vue';
import axios, { AxiosRequestConfig } from 'axios';
import { Message as ElMessage } from "element-ui";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

if (process.env.NODE_ENV === "production") {
  config.baseURL = process.env.VUE_APP_BASE_API;
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (cfg) => {
    if (process.env.NODE_ENV === "production") {
      if (cfg.url && cfg.url.startsWith("/api")) {
        cfg.url = cfg.url.replace(/^\/api/, "");
      }
    }
    // Do something before request is sent
    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    // Do something with response data
    if (res.data && res.data.code) {
      if (res.data.code >= 400) {
        ElMessage.error({
          dangerouslyUseHTMLString: true,
          message: `<pre style="padding:0;margin:0;">${res.data.msg}</pre>`
        });
        return Promise.reject(res.data);
      }
    }
    return res;
  },
  (err) => {
    // Do something with response error
    if (err.response && err.response.data) {
      if (err.response.data.msg) {
        ElMessage.error({
          dangerouslyUseHTMLString: true,
          message: `<pre style="padding:0;margin:0;">${err.response.data.msg}</pre>`
        });
      } else {
        ElMessage.error(err.response.data);
      }
    } else if (err.message) {
      ElMessage.error(err.message);
    } else {
      ElMessage.error("Network Error");
    }
    
    return Promise.reject(err);
  },
);

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios;
  },
};
Plugin.install = (Vue) => {
  Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default _axios;