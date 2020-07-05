import { Component, Vue, Watch, Ref, Prop, PropSync } from "vue-property-decorator";

import { BasicTree } from "@/types/common/Tree";
import { QueryItem } from "@/types/model/VO/QueryItem";
import { Dictionary } from "array-proto-ext";
import DTable, { DTableConfig, Page } from "@/components/global/form/DTable.ts";
import {
  CommandHost,
  CommandBinding,
  Command,
  CommandExecutor,
} from "@/types/command/Command";
import { AddCommand, EditCommand, DeleteCommand } from "@/types/command/Crud";
import DForm, { FormMode } from './DForm';
import PageResult from '@/types/model/VO/PageResult';
import { formatDate } from '@/util/util';

@Component
export default class DCrud<T extends {} = Dictionary<any>> extends Vue {

  //#region props
  @Prop()
  value!: T | null;

  @Prop({ required: true })
  config!: DTableConfig;

  @PropSync("selection", { type: Array, default: () => [] })
  selectionList!: T[];

  @Prop({ type: Array, default: () => [] })
  commands!: CommandBinding[];

  @PropSync("page", {
    default: () => ({
      current: 1,
      size: 10
    })
  })
  pageInfo!: Page;

  @Prop({ type: Function })
  getTree!: (() => Promise<BasicTree[]>) | null;

  @Prop({ type: Function, required: true })
  getList!: ((page: Page, query: QueryItem[]) => Promise<PageResult<T>>);

  @Prop({ type: Function })
  getRow!: ((id: number) => Promise<T>) | null;

  @Prop({ type: Function })
  addRow!: ((row: T) => Promise<void>) | null;

  @Prop({ type: Function })
  updateRow!: ((row: T) => Promise<void>) | null;

  @Prop({ type: Function })
  deleteList!: ((rows: T[]) => Promise<void>) | null;

  //#endregion

  //#region ref,data,computed,watch

  @Ref()
  $table!: DTable;

  @Ref()
  $form!: DForm;

  treeItem: BasicTree | null = null;
  loading = false;
  tree: BasicTree[] = [];
  data: T[] = [];
  mode: FormMode = "view";
  formVisible = false;

  get row() {
    return this.value;
  }
  set row(v) {
    this.$emit("input", v);
  }
  rowTemp: T | null = null;

  @Watch("treeItem")
  onTreeItemChange() {
    this.loadData();
  }


  //#endregion

  mounted() {
    this.loadTree();
    this.loadData();
  }

  //#region event handler
  pageChange() {
    this.loadData();
  }

  execute(command: Command<any>) {
    console.log(command.name + " executed")
    switch (command.name) {
      case "crud.view":
        this.mode = "view";
        this.rowTemp = this.row;
        this.formVisible = true;
        break;
      case "crud.add":
        this.mode = "add";
        this.rowTemp = this.createEmpty();
        this.formVisible = true;
        break;
      case "crud.edit":
        this.mode = "edit";
        this.rowTemp = this.row;
        this.formVisible = true;
        break;
      case "crud.delete":
        this.handleDeleteList();
        break;
      default:
        break;
    }
  }
  //#endregion

  async handleAddRow() {
    try {
      this.loading = true;
      if (this.addRow) {
        await this.addRow(this.rowTemp!);
      }
      this.reload(false);
      this.formVisible = false;
    } catch (error) {
      this.$message.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  async handleUpdateRow() {
    try {
      this.loading = true;
      if (this.updateRow) {
        await this.updateRow(this.rowTemp!);
      }
      this.reload(false);
      this.formVisible = false;
    } catch (error) {
      this.$message.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  async handleDeleteList() {
    try {
      this.loading = true;
      try {
        await this.$confirm("确实要删除所选数据吗？", {
          type: "warning"
        });
      } catch (error) { }
      if (this.deleteList) {
        await this.deleteList(this.selectionList);
      }
      this.reload(false);
    } catch (error) {
      this.$message.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  async loadTree() {
    if (this.config.showTree && this.getTree) {
      this.tree = await this.getTree();
    }
  }

  async loadData(page?: Page, query: QueryItem[] = [], loading = true) {
    page = page || this.pageInfo;
    if (this.config.showTree && this.treeItem) {
      query.push({
        property: this.config.tree?.cascadeQuery ?? "parentId",
        condition: "eq",
        value: this.treeItem
      });
    }
    try {
      if (loading) {
        this.loading = true;
      }
      const res = await this.getList(page, query);
      this.pageInfo.current = res.current;
      this.pageInfo.total = res.total;
      this.data = res.data;
    } catch (error) {
      this.$message.error(error.message);
    } finally {
      if (loading) {
        this.loading = false;
      }
    }
  }

  async updateData() {
    if (this.mode === "add" && this.addRow) {
      await this.handleAddRow();
    } else if (this.mode === "edit" && this.updateRow) {
      await this.handleUpdateRow();
    }
  }

  async reload(loading = true) {
    this.row = null;
    this.rowTemp = null;
    this.selectionList = [];
    this.formVisible = false;
    await this.loadData(this.pageInfo, [], loading);
  }

  async validateForm() {
    this.loading = true;
    try {
      await this.$form.validate();
      this.updateData();
    } catch (error) {
      this.loading = false;
    }
  }

  closeForm() {
    this.rowTemp = null;
    this.formVisible = false;
  }

  createEmpty(): T {
    const obj: Dictionary<any> = {};
    for (const column of this.config.columns) {
      obj[column.prop] = null;
      if (column.required) {
        switch (column.type) {
          case "number": case "range":
            obj[column.prop] = 0;
            break;
          case "text": case "textarea":
            obj[column.prop] = "";
            break;
          case "switch":
            obj[column.prop] = false;
            break;
          case "date": case "time":
            obj[column.prop] = formatDate(new Date(), "yyy-MM-dd hh:mm:ss");
            break;
          default:
            obj[column.prop] = null;
            break;
        }
      }
    }
    return obj as any;
  }
}