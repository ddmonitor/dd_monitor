import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
import { __importDefault } from "tslib";
Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.(?:js|ts|json)$/i)
  const messages: LocaleMessages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = {
        ...__importDefault(locales(key))["default"],
        ...__importDefault(require("element-ui/lib/locale/lang/" + locale))["default"]
      };
    }
  })
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
});
