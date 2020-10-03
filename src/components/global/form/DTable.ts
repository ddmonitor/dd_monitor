import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { Table as ElTable } from 'element-ui';
import { Command, CommandHost, UICommandBinding, CommandExecutor } from '@/types/command/Command';
import { DCrudConfig, Page, ColumnConfig } from './crud';


@Component
export default class DTable<T extends {} = Dictionary<any>> extends Vue 
    implements CommandHost{

    @Prop()
    value: T | undefined;

    @Prop({ type: Array, default: () => [] })
    data!: T[];

    @Prop({ required: true })
    config!: DCrudConfig;

    @Prop({ type: Array, default: () => [] })
    commands!: UICommandBinding[];

    @PropSync("page", { 
        default: () => ({
            current: 1,
            size: 10
        })
    })
    pageInfo!: Page;

    @Prop({ type: Array, default: () => [] })
    selection!: T[];

    @Ref()
    $table!: ElTable;

    get bindings() {
        return this.commands
            .reduce<Dictionary<UICommandBinding>>((s, v)=> {
                s[v.command.name] = v;
                return s;
            }, {});
    }

    get topCommands() {
        return this.commands.filter(c => !c.location || c.location == "command-bar");
    }

    get inlineCommands() {
        return this.commands.filter(c => c.location == "table-inline");
    }

    mounted() {
        this.onSelectionChange(this.selection);
        this.onCurrentRowChange(this.value);
    }

    // 外部（代码）传入
    @Watch("selection")
    onSelectionChange(v: T[]) {
        if (this.config.selection) {
            for (const row of this.data) {
                if (v.includes(row)) {
                    this.$table.toggleRowSelection(row, true);
                } else {
                    this.$table.toggleRowSelection(row, false);
                }
            }
        }
    }
    // 内部（用户）传出
    selectionChange(rows: T[]) {
        this.$emit("update:selection", rows);
    }


    @Watch("value")
    onCurrentRowChange(v?: T) {
        this.$table.setCurrentRow(v);
    }
    currentRowChange(row: T) {
        this.$emit("input", row);
    }

    pageChange() {
        this.$emit("page-change", this.pageInfo);
    }
    
    onCommand({ command }: UICommandBinding) {
        this.$emit("command", command);
    }

    onInlineCommand({ command }: UICommandBinding, row: any) {
        this.$emit("inline-command", command, row);
    }

}