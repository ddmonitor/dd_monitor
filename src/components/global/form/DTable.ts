import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { Table as ElTable } from 'element-ui';
import { Command, CommandHost, CommandBinding, CommandExecutor } from '@/types/command/Command';
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

    @Ref()
    $table!: ElTable;

    get bindings() {
        return this.commands
            .reduce<Dictionary<CommandBinding>>((s, v)=> {
                s[v.command.name] = v;
                return s;
            }, {});
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
    
    onCommand({ command }: CommandBinding) {
        this.$emit("command", command);
        // switch (command.name) {
        //     case "crud.add":
        //         this.$emit("row-add");
        //         break;
        //     case "crud.edit":
        //         this.$emit("row-edit", this.value);
        //         break;
        //     case "crud.delete":
        //         this.$emit("row-delete", this.selection);
        //         break;
        //     default:
        //         break;
        // }
        
    }

}