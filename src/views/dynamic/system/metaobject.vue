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
import { DCrudConfig, Page } from "@/components/global/form/crud";
import {
  CommandHost,
  CommandBinding,
  Command,
  CommandExecutor, UICommandBinding
} from "@/types/command/Command";
import { AddCommand, EditCommand, DeleteCommand, ViewCommand } from "@/types/command/Crud";

@Component
export default class metaobject extends Vue {

  get commands(): UICommandBinding[] {
    return [
      { command: ViewCommand, type: "button", executable: true, location: "table-inline"  },
      { command: AddCommand, type: "button",  executable: true },
      { command: EditCommand, type: "button",  executable: true, location: "table-inline" },
      { command: DeleteCommand, type: "button",  executable: this.selection.length > 0 }, 
    ];
  }

  page: Page = {
    current: 1,
    size: 10
  };
  config: DCrudConfig = {
    titleI18n: "forms.meta_object.$name",
    selection: true,

    showIndex: true,
    showCommand: true,
    showAction: true,
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
        type: "ref",
        i18n: "meta_object.moduleId",
        presentProp: "moduleName",
        "ref.refKey": "MetaModuleRef"
      },
      {
        prop: "tableName",
        type: "text",
        i18n: "meta_object.tableName"
      },
      {
        prop: "metaType",
        type: "dict",
        i18n: "meta_object.metaType",
        required: true,
        "dict.dictKey": "meta_type"
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