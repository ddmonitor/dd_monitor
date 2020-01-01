import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from 'vue';

@Component
export default class DWrap extends Vue {
    render(h: CreateElement) {
        return (
            <div class="d-wrap">
                {this.$slots.default}
            </div>
        );
    }
}