import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement, VNode } from 'vue';
import { MenuItem } from '@/config/menu';
@Component
export default class AppMenu extends Vue { 
    @Prop({ type: Array, default: () => [] })
    menu!: MenuItem[];

    render(h: CreateElement) {
        const vm = (
            <el-menu mode="horizontal" class="app-menu" menu-trigger="click"
                default-active="m0">
                {this.menuRender(this.menu)}
            </el-menu>
        );
        return vm;
    }

    menuRender(menu: MenuItem[]): VNode[] {
        return menu.map(m => {
            if (m.children.length > 0) {
                return (
                    <el-submenu index={m.id}>
                        <div slot="title">
                            <i class={m.icon} v-show={m.icon}></i>
                            {m.name}
                        </div>
                        {this.menuRender(m.children)}
                    </el-submenu>
                );
            } else {
                return (
                    <el-menu-item index={m.id}
                        onClick={() => this.menuSelect(m)}>
                        <i class={m.icon} v-show={m.icon}></i>
                        {m.name}
                    </el-menu-item>
                );
            }
        });

    }

    menuSelect(item: MenuItem) {
        if (item.data.route) {
            this.$router.push(item.data.route);
        }
        this.$emit("menu-select", item);
    }
}