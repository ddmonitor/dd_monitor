import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement, VNode } from 'vue';

@Component
export default class VNodeRender extends Vue {

    @Prop({ type: Function, required: true })
    contentRender!: (h: CreateElement, ...args: any[]) => VNode;

    @Prop({ type: Array, default: () => [] })
    args!: any[];

    render(h: CreateElement) {
        return this.contentRender(h, ...this.args);
    }
}