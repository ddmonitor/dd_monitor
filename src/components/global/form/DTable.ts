import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { Table as ElTable } from 'element-ui';
import { Command, CommandHost, CommandBinding, CommandExecutor } from '@/types/command/Command';

export type ColumnType =
    // 基础数据类型
    "text" | "number" | "range" | "switch" | "date" | "time" |
    // 选择
    "select" | "check" | "radio" |
    // 系统类型
    "dict" | "ref" | "tree" |
    // 其它html类型
    "file" | "color" | "password" | "email" |
    // 专用渲染类型
    "image" | "icon" | "textarea" | "code" | "link" | "progress"
    // 子表
    "subTable";
    
export interface ColumnConfig {
    prop: string;
    type: ColumnType;
    required?: false | boolean;
    readonly?: false | boolean;
    order?: 0 | number;

    label?: string;
    i18n?: string;
    width?: number;
    className?: string;
    colSpan?: 12 | number;
    tableHidden?: boolean;
    formHidden?: boolean;

    "select.optionList"?: any[];
    "dict.dictKey"?: string;
    "ref.refKey"?: string;
    "ref.labelProp"?: string;
    "range.min"?: number;
    "range.max"?: number;  

    customConfig?: Dictionary<any>;
}

export interface TreeConfig {
    showCode?: boolean;
    props: {
        id?: "id" | string;
        name?: "name" | string;
        code?: "code" | string;
        children?: "children" | string;   
    };
    cascadeQuery: "parentId" | string;
}

export interface DTableConfig {
    /** 表格标题 */
    title?: string;
    /** 表格标题 */
    titleI18n?: string;
    /** 允许多择 */
    selection?: boolean;
    /** 显示序号 */
    showIndex?: boolean;
    /** 行操作列 */
    showAction?: boolean;
    /** 顶部命令栏 */
    showCommand?: boolean;
    /** 左侧树 */
    showTree?: boolean;
    /** 是否分页 */
    page?: boolean;

    /** 列定义 */
    columns: ColumnConfig[];

    tree?: TreeConfig;
}

export interface Page {
    current: number;
    size: number;
    total?: number;
}

@Component
export default class DTable<T extends {} = Dictionary<any>> extends Vue 
    implements CommandHost{

    @Prop()
    value: T | undefined;

    @Prop({ type: Array, default: () => [] })
    data!: T[];

    @Prop({ required: true })
    config!: DTableConfig;

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