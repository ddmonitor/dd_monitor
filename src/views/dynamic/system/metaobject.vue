<template>
  <DCrud v-model="currentRow"
    class="d-h100"
    :config="config"
    :page.sync="page"
    :selection.sync="selection"
    :commands="commands"

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
import { getList, getDetail, tree, update, remove } from "@/api/system/metaobject";

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
export default class metaobject extends Vue {

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
    titleI18n: "forms.meta_object.$name",
    selection: true,

    showIndex: true,
    showCommand: true,
    showTree: false,
    page: true,
    columns: [
      {
        prop: "code",
        type: "text",
        i18n: "meta_object.code",
        required: true
      },
      {
        prop: "entityName",
        type: "text",
        i18n: "meta_object.entityName",
        required: true
      },
      {
        prop: "moduleId",
        type: "number",
        i18n: "meta_object.moduleId",
        "ref.labelProp": "moduleName"
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
  };


  currentRow: any = null;
  selection: any[] = [];


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