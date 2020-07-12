import { Dictionary } from 'array-proto-ext';

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
    "image" | "icon" | "textarea" | "code" | "link" | "progress" |
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

export interface DCrudConfig {
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