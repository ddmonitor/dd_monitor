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
import { getList, getDetail, tree, update, remove } from "@/api/system/metamodule";

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
  config: DTableConfig = {
    titleI18n: "forms.meta_module.$name",
    selection: true,

    showIndex: true,
    showCommand: true,
    showTree: true,
    page: true,
    columns: [
      {
        prop: "key",
        type: "text",
        i18n: "meta_module.key",
        required: true
      },
      {
        prop: "name",
        type: "text",
        i18n: "meta_module.name",
        required: true
      },
      {
        prop: "createTime",
        type: "date",
        i18n: "common.create_time",
        readonly: true
      },
      {
        prop: "updateTime",
        type: "date",
        i18n: "common.update_time",
        readonly: true
      }
    ],
    tree: {
      showCode: false,
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