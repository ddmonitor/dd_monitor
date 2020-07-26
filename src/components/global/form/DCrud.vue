<template>
  <div class="d-crud">
    <DWrap>
      <div class="d-crud__main">
        <DTree v-if="config.showTree"
          v-model="treeItem" 
          :showCode="config.tree.showCode" 
          :showIcon="config.tree.showIcon" 
          :tree="tree">
        </DTree>

        <div class="d-crud__wrapper">
          <div v-if="config.titleI18n || config.title" class="d-crud__title">
            <slot name="title" :config="config">
              <h2>{{config.titleI18n ? $t(config.titleI18n) : (config.title || "")}}</h2>
            </slot>
          </div>

          <DTable ref="$table"
            v-model="row"
            v-loading="loading"
            :config="config"
            :commands="commands"
            :data="data"
            :selection.sync="selectionList"
            :page.sync="pageInfo"
            @page-change="pageChange"
            @command="execute">
          </DTable>

          <el-drawer :visible.sync="formVisible" 
            size="100%"
            :modal="false"
            :append-to-body="false"
            :modal-append-to-body="false"
            :with-header="true"
            @close="closeForm">
            <div slot="title">
              <template v-if="!['view','approval','userView'].includes(mode)">
                <el-button 
                  size="small" type="info" 
                  icon="fa fa-check" 
                  :loading="loading"
                  @click="validateForm">
                  {{$t("actions.command.ok")}}
                </el-button>
                <el-button plain size="small" 
                  icon="fa fa-times" 
                  :disabled="loading"
                  @click="closeForm">
                  {{$t("actions.command.cancel")}}
                </el-button>
              </template>
            </div>

            <DForm v-if="rowTemp" ref="$form"
              v-model="rowTemp"
              :columns="config.columns"
              :mode="mode">
            </DForm>
          </el-drawer>
        </div>
      </div>
    </DWrap>
  </div>
</template>

<script lang="ts" src="./DCrud.ts"></script>

<style lang="scss">
@import "@/styles/variables.scss";
.d-crud {
  .d-crud__main {
    display: flex;

    .d-tree {
      width: 400px;
      height: 100%;
      margin-right: 16px;
    }
    .d-crud__wrapper {
      flex: auto;
      position: relative;
      display: flex;
      flex-direction: column;

      .d-crud__title {
        width: 100%;
        background-color: white;
        border-bottom: 1px solid $basic-border;
        h2 {
          text-align: center;
          margin: 0;
          line-height: 40px;
          font-size: 1.2em;
        }
      }

      .el-drawer__wrapper {
        position: absolute;
        left: 0;
        top: 41px;
        height: calc(100% - 41px);
        width: 100%;
        .el-drawer {
          .el-drawer__header {
            text-align: left;
            padding: 15px 20px 15px 80px;
          }
        }
      }
      .d-form {
        
      }
    }  
  }
}
</style>