import { VueConstructor, ComponentOptions } from 'vue';
import { createDecorator } from 'vue-class-component';
import { Dictionary } from 'array-proto-ext';


export function getOptions<T extends Vue = Vue>(
    mod: (VueConstructor & { options: ComponentOptions<T> })
        | ComponentOptions<T>): ComponentOptions<T> {
    if ((mod as any).options) {
        return (mod as any).options;
    } else {
        return mod as any;
    }
}
