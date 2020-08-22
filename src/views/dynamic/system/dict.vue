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
import { getList, getDetail, update, remove } from "@/api/system/dict";

import { BasicTree } from "@/types/common/Tree";
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
    titleI18n: "forms.meta_ref.$name",
    selection: true,

    showIndex: true,
    showCommand: true,
    showTree: true,
    page: true,
    columns: [
      {
        prop: "itemValue",
        type: "text",
        i18n: "meta_ref.key",
        required: true
      },
      {
        prop: "itemName",
        type: "text",
        i18n: "meta_ref.name", 
        required: true
      },
      // {
      //   prop: "metaObjectId",
      //   type: "ref",
      //   "ref.refKey": "MetaObjectRef",
      //   i18n: "meta_ref.metaObjectId"
      // },
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
      props: {

      },
      cascadeQuery: "dictId"
    }
  };


  currentRow: any = null;
  selection: any[] = [];

  async getTree() {
    const res = await getList();
    return res.data.data.data.map(d => ({
      id: d.id,
      code: d.dictKey,
      name: d.dictName
    }));
  }

  async getList(page: Page, query: QueryItem[]) {
    if (query.length > 0) {
      const res = await getDetail(query[0].value);
      return {
        current: 1,
        total: res.data.data.items.length,
        data: res.data.data.items
      };
    } else {
      return [];
    }
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