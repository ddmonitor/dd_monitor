import { Module } from 'vuex';

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