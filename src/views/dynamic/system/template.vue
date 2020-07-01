<template>
  <DWrap>
    <div class="d-layout--treetable">
      <DTree v-model="treeItem"  
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
import { getList } from "@/api/system/template";

import { BasicTree } from '@/types/common/Tree';
import { QueryItem } from "@/types/model/VO/QueryItem";
import { Dictionary } from 'array-proto-ext';
import { DTableConfig, Page } from "@/components/global/form/DTable.ts";

@Component
export default class Template extends Vue {

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
        prop: "name",
        type: "text",
        label: "Name"
      }
    ]
  };

  treeItem: BasicTree | null = null;
  currentRow: any = null;
  selection: any[] = [];


  mounted() {
    this.loadData(this.page);
  }

  async loadData(page?: Page) {
    page = page || this.page;
    try {
      this.loading = true;
      const res = await getList([], page.current, page.size);
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