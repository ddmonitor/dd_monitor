import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { DCrudConfig, Page } from './crud';
import { CommandBinding, CommandHost } from '@/types/command/Command';

@Component
export default class DCardList<T extends {} = Dictionary<any>> extends Vue 
    implements CommandHost { 
    
    @Prop()
    value: T | undefined;

    @Prop({ type: Array, default: () => [] })
    data!: T[];

    @Prop({ required: true })
    config!: DCrudConfig;

    @Prop({ type: Array, default: () => [] })
    commands!: CommandBinding[];

    @PropSync("page", { 
        default: () => ({
            current: 1,
            size: 10
        })
    })
    pageInfo!: Page;

    @Prop({ type: Array, default: () => [] })
    selection!: T[];

    get bindings() {
        return this.commands
            .reduce<Dictionary<CommandBinding>>((s, v)=> {
                s[v.command.name] = v;
                return s;
            }, {});
    }
}