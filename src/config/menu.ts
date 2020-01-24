import { TreeItem } from '@/types/common/Tree';
import i18n from "@/plugins/i18n";
import { RawLocation } from 'vue-router';

interface MenuData {
    route?: RawLocation;
}
export class MenuItem implements TreeItem<MenuData> {
    id: string;
    code: string;
    icon?: string;
    children: MenuItem[] = [];
    data: MenuData = {};

    constructor(id: string, code: string) {
        this.id = id;
        this.code = code;
    }

    get name() {
        const key = "menus." + this.code;
        const translation = i18n.t(key) as string;
        return key === translation ? this.code : translation;
    }

    // builder模式，链式设置可选属性并返回自身

    $icon(icon: string): MenuItem {
        this.icon = icon;
        return this;
    }

    $data(data: MenuData): MenuItem {
        this.data = data;
        return this;
    }

    $children(children: MenuItem[]) {
        this.children = children;
        return this;
    }

}

export default [
    // new MenuItem("m1", "switch_template").$icon("fa fa-toggle-on").$children([
    //     new MenuItem("m1_1", "hololive#1-2v").$data({
    //         route: "/home/t3_1"
    //     })
    // ]),
    new MenuItem("m2", "template_manage").$icon("fa fa-cog"),
    new MenuItem("m3", "about").$icon("fa fa-info")
];