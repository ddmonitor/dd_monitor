<template>
  <DCrud v-model="currentRow"
    class="d-h100"
    :config="config"
    :page.sync="page"
    :selection.sync="selection"
    :commands="commands"

    :getTree="getTree"
    :getList="getList"
    :getRow="getRow"
    :addRow="addOrUpdateRow"
    :updateRow="addOrUpdateRow"
    :deleteList="deleteList"
  >

  </DCrud>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from "vue-property-decorator";
import { getList, getDetail, tree, update, remove } from "@/api/baseinfo/department";

import { BasicTree, TreeItem } from "@/types/common/Tree";
import { QueryItem } from "@/types/model/VO/QueryItem";
import { Dictionary } from "array-proto-ext";
import { DCrudConfig, Page } from "@/components/global/form/crud";
import {
  CommandHost,
  CommandBinding,
  Command,
  CommandExecutor,
} from "@/types/command/Command";
import { AddCommand, EditCommand, DeleteCommand, ViewCommand } from "@/types/command/Crud";

@Component
export default class MetaModule extends Vue {

  get commands(): CommandBinding[] {
    return [
      { command: ViewCommand, executable: !!this.currentRow },
      { command: AddCommand, executable: true },
      { command: EditCommand, executable: !!this.currentRow },
      { command: DeleteCommand, executable: this.selection.length > 0 }, 
    ];
  }

  page: Page = {
    current: 1,
    size: 10
  };
  config: DCrudConfig = {
    titleI18n: "forms.department.$name",
    selection: true,

    showIndex: true,
    showCommand: true,
    showTree: true,
    page: true,
    columns: [
      {
        prop: "code",
        type: "text",
        i18n: "department.code",
        required: true
      },
      {
        prop: "icon",
        type: "image",
        i18n: "department.icon",
        readonly: true
      },
      {
        prop: "name",
        type: "text",
        i18n: "department.name",
        required: true
      },
      {
        prop: "originName",
        type: "text",
        i18n: "department.originName"
      },
      {
        prop: "parentId",
        type: "ref",
        i18n: "department.parentId",
        "ref.refKey": "DeptRef",
        presentProp: "parentName"
      },
      {
        prop: "createTime",
        type: "date",
        i18n: "common.createTime",
        readonly: true
      },
      {
        prop: "updateTime",
        type: "date",
        i18n: "common.updateTime",
        readonly: true
      }
    ],
    tree: {
      showCode: true,
      showIcon: false,
      props: {

      },
      cascadeQuery: "parentId"
    }
  };


  currentRow: any = null;
  selection: any[] = [];

  async getTree() {
    const res = await tree();
    return res.data.data;
  }

  // setIcon(tree: TreeItem<string>[]): TreeItem<string>[] {
  //   for (const node of tree) {
  //     node.icon = node.data;
  //     if (node.children && node.children.length > 0) {
  //       node.children = this.setIcon(node.children);
  //     }
  //   }
  //   return tree;
  // }

  async getList(page: Page, query: QueryItem[]) {
    const res = await getList(query, page.current, page.size);
    return res.data.data;
  }

  async getRow(id: number) {
    const res = await getDetail(id);
    return res.data.data;
  }

  async addOrUpdateRow(row: any) {
    await update(row);
  }

  async deleteList(list: any[]) {
    await remove(list.map(r => r.id));
  }

  
}
</script>

<style lang="scss">
</style>