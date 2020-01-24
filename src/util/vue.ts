import { VueConstructor, ComponentOptions } from 'vue';
import { createDecorator } from 'vue-class-component';
import { Dictionary } from 'array-proto-ext';
import { TemplateMode } from '@/types/model/TemplateMode';

export function getOptions<T extends Vue = Vue>(
    mod: (VueConstructor & { options: ComponentOptions<T> })
        | ComponentOptions<T>): ComponentOptions<T> {
    if ((mod as any).options) {
        return (mod as any).options;
    } else {
        return mod as any;
    }
}
export interface TemplateMeta {
    name: string;
    category?: string;
    path: string;
    description: string;
    mode: TemplateMode;
    icon?: string;
    [key: string]: any;
}
export function Meta(meta: TemplateMeta) {
    return createDecorator((options, key) => {
        (options.computed || (options.computed = {}))["__META__"] = function() {
            return meta;
        };
    });
}