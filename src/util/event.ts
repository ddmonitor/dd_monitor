export function addDOMListenerOnce<V extends Vue, K extends keyof WindowEventMap>(
    vue: V, type: K, listener: (this: V, ev: WindowEventMap[K]) => any, element: EventTarget = window) {
    element.addEventListener(type, listener);
    vue.$once("hook:beforeDestroy", () => {
        element.removeEventListener(type, listener);
    });
}