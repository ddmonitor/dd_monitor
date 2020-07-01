<template>
  <DWrap>
    <div class="d-layout--treetable">
      <DTree v-model="treeItem" :showCode="false" 
        :tree="tree">
      </DTree>
      
      <DTable ref="$table" v-model="currentRow" 
        v-loading="loading"
        :config="config" :data="data" 
        :selection.sync="selection"
        :page.sync="page"
        @page-change="pageChange">
      </DTable>
    </div>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getList, tree } from "@/api/system/metamodule";

import { BasicTree } from '@/types/common/Tree';
import { QueryItem } from "@/types/model/VO/QueryItem";
import { Dictionary } from 'array-proto-ext';
import { DTableConfig, Page } from "@/components/global/form/DTable.ts";

@Component
export default class MetaModule extends Vue {

  loading = false;
  tree: BasicTree[] = [];
  data: Dictionary<any>[] = [];
  page: Page = {
    current: 1,
    size: 10
  };
  config: DTableConfig = {
    title: "Table Title",
    selection: true,

    showIndex: true,
    showAction: true,
    page: true,
    columns: [
      {
        prop: "key",
        type: "text",
        label: "Key"
      },
      {
        prop: "name",
        type: "text",
        label: "Name"
      }
    ]
  };

  treeItem: number | null = null;
  currentRow: any = null;
  selection: any[] = [];

  @Watch("treeItem")
  onTreeItemChange() {
    this.loadData();
  }

  mounted() {
    this.loadTree();
    this.loadData();
  }

  async loadTree() {
    const res = await tree();
    this.tree = res.data.data;
  }

  async loadData(page?: Page, query: QueryItem[] = []) {
    page = page || this.page;
    if (this.treeItem) {
      debugger
      query.push({
        property: "parentId",
        condition: "eq",
        value: this.treeItem
      });
    }
    try {
      this.loading = true;
      const res = await getList(query, page.current, page.size);
      this.page.current = res.data.data.current;
      this.page.total = res.data.data.total;
      this.data = res.data.data.data;
    } catch (error) {
      this.$message.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  pageChange() {
    this.loadData();
  }
}
</script>

<style lang="scss">

</style>