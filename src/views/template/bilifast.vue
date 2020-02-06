<template>
  <DWrap>
    <div class="bili-fast">
      <div class="left">
        <el-card>
          <el-tree :data="tree" :props="{ label: 'name' }" node-key="id"
            @node-click="selectGroup">
            <span class="tree-node" slot-scope="{ data }">
              <span>{{ data.name }}</span>
            </span>
          </el-tree>
        </el-card>
      </div>
      <el-card class="right">
        <div class="d-valign container">
          <el-form >
            <el-form-item>
              <el-input v-model="id" placeholder="请输入房间号"/>
            </el-form-item>
          </el-form>

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

          <div style="height:100px" v-loading="loading">
            <BLive :roomid="id"  />
          </div>
          <YagooKoatsu style="margin-top:20px;"/>
        </div>
      </el-card>
    </div>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { addDOMListenerOnce } from "@/util/event";
import { Meta, TemplateMeta } from '@/util/vue';
import { getList, getDetail, query } from '@/api/vtb';
import { getLiveInfo } from '@/api/bili';
import { getTree } from '@/api/group';
import { BasicTree } from '@/types/common/Tree';
import { ComponentMessageEvent } from "@/types/message/message";
@Component
export default class hololivebili extends Vue {

  @Meta({
    name: "bilibili 直播极速版",
    category: "bilibili",
    description: "bilibili直播冲国dd特供，一键多开小窗<br />新增yagoo降压仪，快来播放社歌为yagoo降血压吧！",
    path: "bilifast",
    icon: "/img/template/bilibili.png",
    mode: "window"
  })
  metadata!: TemplateMeta;

  tree: BasicTree[] = [];
  data: any[] = [];
  page = {
    current: 1,
    size: 10,
    total: 1
  };
  currentGroup: BasicTree | null = null;
  id = "";
  loading = false;

  @Watch("currentGroup")
  groupChange() {
    if (this.currentGroup) {
      this.loadData(this.currentGroup.id);
    }
  }
  mounted() {
    this.loadTree();
  }

  async loadTree() {
    const res = await getTree();
    this.tree = res.data.data;
  }

  currentChange(current: number) {
    this.loadData(this.currentGroup!.id, current);
  }

  async loadData(groupId: number, current = 1) {
    const res = await query({
      groupId
    }, current, this.page.size);
    this.page.current = res.data.data.current;
    this.page.total = res.data.data.total;
    this.data = res.data.data.data;
  }

  selectGroup(data: BasicTree) {
    this.currentGroup = data;
  }

  async selectVtb(row: any) {
    try {
      this.loading = true;
      const res = await getLiveInfo(row.biliUid);
      this.id = res.data.roomid + "";
    } catch (error) {
      this.$message.warning(error.message);
    } finally {
      this.loading = false;
    }
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
    width: 300px;
    overflow-y: auto;
    .el-card {
      height: 100%;
      .el-tree {
        height: 100%;
        .el-tree-node__content {
          height: auto;
        }
        .tree-node {
          padding: 8px 4px;
          font-size: 20px;
        }
      }
    }
  }
  .right {
    margin-left: 16px;
    flex: auto;
    .d-valign.container {
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