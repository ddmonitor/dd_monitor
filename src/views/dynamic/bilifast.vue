<template>
  <DWrap>
    <div class="bili-fast">
      <div class="left">
        <DTree v-model="currentGroup" 
          :showCode="false" 
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
              <el-table :data="data" :highlight-current-row="true" border
                @row-click="selectVtb"
                height="100%" >
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="biliUid"
                  label="bilibili UID">
                </el-table-column>
                <el-table-column
                  prop="groupId"
                  label="分组">
                  <template>
                    {{currentGroup?currentGroup.name:''}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              layout="prev, pager, next"
              :total="page.total"
              :current-page.sync="page.current"
              :page-size.sync="page.size"
              @current-change="currentChange">
            </el-pagination>
          </div>

          <div>
            <BLive :uid="currentUid" />
          </div>
          <YagooKoatsu style="margin-top:20px;"/>
        </div>
      </div>
    </div>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { addDOMListenerOnce } from "@/util/event";
import { getList, getDetail, query } from '@/api/vtb';
import { getTree } from '@/api/group';
import { BasicTree } from '@/types/common/Tree';
import { ComponentMessageEvent } from "@/types/message/message";
import { Dictionary } from 'array-proto-ext';
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
  currentUid = 0;

  @Watch("currentGroup")
  groupChange() {
    if (this.currentGroup) {
      this.loadData({ groupId:this.currentGroup });
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

  currentChange(current: number) {
    this.loadData({ groupId:this.currentGroup }, current);
  }

  async loadData(params: Dictionary<any> = {}, current = 1) {
    const res = await query(params, current, this.page.size);
    this.page.current = res.data.data.current;
    this.page.total = res.data.data.total;
    this.data = res.data.data.data;
  }

  selectVtb(row: any) {
    this.currentUid = row.biliUid;
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
        .el-table {
          width: 1vw;
          flex: auto;
        }
      }
      .el-pagination {
        text-align: right;
        margin-top: 12px;
      }
    }
  }
}
</style>