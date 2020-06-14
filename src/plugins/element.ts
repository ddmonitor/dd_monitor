import Vue from 'vue';
import Element from 'element-ui';
import i18n from "./i18n";

Vue.use(Element, {
    i18n: (key: string, value: any) => i18n.t(key, value)
});
