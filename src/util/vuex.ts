import { Module } from 'vuex';
import { createDecorator } from 'vue-class-component';
import { Dictionary } from 'array-proto-ext';
/** 定义Vuex模块的时候提供正确的类型检查 */
export function createModule<S>(_module: Module<S, any>) {
    return _module;
}

export function getStore<T = string>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export function setStore<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}
/**
 * 创建一个可读写计算属性，实现对vuex对象的v-model
 * @param mutation mutation名
 * @param state state名，若为空则使用属性名
 */
export function StoreBinding(mutation: string, state?: string) {
    return createDecorator((options, key) => {
        (options.computed || (options.computed = {}))[key] = {
            get(this: Vue & Dictionary<any>) {
                return this.$store.state[state || key];
            },
            set(this: Vue & Dictionary<any>, value) {
                this.$store.commit(mutation, value);
            }
        };
    });
}