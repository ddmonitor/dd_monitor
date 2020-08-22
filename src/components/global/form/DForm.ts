import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { ColumnConfig, prepareData } from './crud';
import _ from "lodash";
import { Form as ElForm } from 'element-ui';
export type FormMode =
    /** 新增 */
    "add" |
    /** 修改 */
    "edit" |
    /** 复制 */
    "copy" |
    /** 设计 */
    "design" |
    /** 查看 */
    "view" |
    /** 审批 */
    "approval" |
    /** 引用 */
    "link" |
    /** 查看（用户界面） */
    "userView";

@Component
export default class DForm<T extends {} = Dictionary<any>> extends Vue {

    @Prop({ default: () => ({}) })
    value!: T;

    @Prop({ type: Array, default: () => [] })
    columns!: ColumnConfig[];

    @Prop({ type: String, default: "edit" })
    mode!: FormMode;

    @Ref()
    $form!: ElForm;

    get myColumns() {
        const groups: {
            [key: number]: ColumnConfig[]
        } = {
            0: []
        };

        let i = 0;
        let span = 0;
        for (const col of this.columns) {
            col.colSpan = col.colSpan ?? 12;
          
            let sum = span + col.colSpan;
            if (sum <= 24) {
                span = sum;
            } else {
                span = col.colSpan;
                i++;
                groups[i] = [];
            }
            groups[i].push(col);
        }

        return groups;
    }

    myValue: T = null as any;

    mounted() {
        this.myValue = prepareData([_.cloneDeep(this.value)], this.columns)[0];
    }

    @Watch("value")
    onValueChange() {
        this.myValue = prepareData([_.cloneDeep(this.value)], this.columns)[0];
    }

    async validate() {
        await new Promise<void>((resolve, reject) => {
            this.$form.validate((
                isValid: boolean,
                invalidFields: {
                    message: string;
                    field: string;
                }[]) => 
                isValid ? resolve() : reject({})
            );
        });
        this.$emit("input", this.myValue);
    }
}