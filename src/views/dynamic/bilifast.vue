<template>
  <DWrap>
    <div class="bili-fast">
      <div class="left">
        <DTree v-model="currentGroup" 
          :showCode="false" 
          :showIcon="false"
          :tree="tree">
        </DTree>
      </div>
      
      <div class="right">
        <div class="d-flex-v container">
          <!-- <el-form >
            <el-form-item>
              <el-input v-model.number="id" placeholder="请输入房间号"/>
            </el-form-item>
          </el-form> -->

          <div class="vtb-select" >
            <div class="table-wrapper">
              <DTable :data="data" :config="config" 
                v-model="currentRow" 
                :selection.sync="select"
                :page.sync="page"
                @page-change="pageChange">

              </DTable>
            </div>
          </div>

          <BLive :uid="currentRow ? currentRow.biliUid : 0" style="margin-top:16px"/>
          
          <YagooKoatsu style="margin-top:20px;"/>
        </div>
      </div>
    </div>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { addDOMListenerOnce } from "@/util/event";
import { getList, getDetail} from '@/api/vtb';
import { getTree } from '@/api/group';
import { BasicTree } from '@/types/common/Tree';
import { QueryItem } from "@/types/model/VO/QueryItem";
import { ComponentMessageEvent } from "@/types/message/message";
import { Dictionary } from 'array-proto-ext';
import { DCrudConfig } from "@/components/global/form/crud";
@Component

export default class hololivebili extends Vue {



  tree: BasicTree[] = [];
  data: any[] = [];
  page = {
    current: 1,
    size: 10,
    total: 1
  };
  currentGroup: number | null = null;
  id = 0;
  loading = false;
  currentRow = null;

  select: any[] = [];

  config: DCrudConfig = {
    // title: "test",
    showIndex: true,
    // selection: true,
    page: true,
    columns: [
      {
        prop: "name",
        type: "text",
        label: "姓名"
      },
      {
        prop: "biliUid",
        type: "text",
        label: "UID",
        width: 120
      },
      {
        prop: "remark",
        type: "textarea",
        label: "备注"
      },
    ]
  }

  @Watch("currentGroup")
  groupChange() {
    if (this.currentGroup) {
      this.loadData([
        { 
          property: "groupId",
          condition: "eq",
          value: this.currentGroup
        }
      ]);
    }
  }
  mounted() {
    this.loadTree();
    // this.loadData();
  }

  async loadTree() {
    const res = await getTree();
    this.tree = res.data.data;
  }

  pageChange(page: { current: number }) {
    this.loadData([
        { 
          property: "groupId",
          condition: "eq",
          value: this.currentGroup
        }
      ], page.current);
  }

  async loadData(params: QueryItem[] = [], current = 1) {
    const res = await getList(params, current, this.page.size);
    this.page.current = res.data.data.current;
    this.page.total = res.data.data.total;
    this.data = res.data.data.data;
  }

}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.bili-fast {
  display: flex;
  > div {
    height: 100%;
  }
  .left {
    width: 360px;  
    .d-tree {
      height: 100%;
    }
  }
  .right {
    margin-left: 16px;
    flex: auto;
    .d-flex-v.container {
      height: 100%;
      align-items: stretch;
    }
    .vtb-select {
      width: 100%;
      height: 100%;
      flex: auto;
      display: flex;
      flex-direction: column;
      .table-wrapper {
        display: flex;
        flex: auto;
        height: 100%;
        // .el-table {
        //   width: 1vw;
        //   flex: auto;
        // }
      }
      // .el-pagination {
      //   text-align: right;
      //   margin-top: 12px;
      // }
    }
  }
}
</style>