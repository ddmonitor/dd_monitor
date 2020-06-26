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
    new MenuItem("m0", "home").$icon("fa fa-home").$data({
        route: "/"
    }),
    new MenuItem("m1", "bilifast").$icon("fa fa-search").$data({
        route: "/bilifast"
    }),
    // new MenuItem("m2", "about").$icon("fa fa-info")
];