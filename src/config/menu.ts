import { TreeItem } from '@/types/common/Tree';
import i18n from "@/plugins/i18n";


class MenuItem implements TreeItem {
    id: string;
    code: string;
    icon?: string;
    children: MenuItem[];
    data: undefined;

    constructor(id: string, code: string, icon?: string, children = []) {
        this.id = id;
        this.code = code;
        this.icon = icon;
        this.children = children;
    }

    get name() {
        return i18n.t("menus." + this.code) as string;
    }

}

export default [
    new MenuItem(
        "m1",
        "template_manage",
        "fa fa-cog",
        [
            
        ]
    ),
    new MenuItem(
        "m2",
        "about",
        "fa fa-info"
    )
] as TreeItem[];