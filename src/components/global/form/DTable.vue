<template>
  <div class="d-table">
    <div v-if="config.titleI18n || config.title" class="d-table__title">
      <slot name="title" :config="config">
        <h2>{{config.titleI18n ? $t(config.titleI18n) : (config.title || "")}}</h2>
      </slot>
    </div>

    <div v-if="config.showCommand" class="d-table__commandbar">
      <ToolBar>
        <template v-for="cmd in commands">
          <slot :name="'cmd.'+cmd.command.name" :bind="cmd" >
            <el-button plain size="small" 
              :key="'btn_'+ cmd.command.name"
              :icon="cmd.command.icon" 
              :disabled="!cmd.executable"
              @click="onCommand(cmd)">
              {{cmd.command.i18n ? $t(cmd.command.i18n) : (cmd.command.text || "") }}
            </el-button>
          </slot>
        </template>
      </ToolBar>
    </div>

    <ResponsivePanel class="d-table__main">
      <el-table ref="$table" :data="data" 
         height="100%"
        :highlight-current-row="true"
        @selection-change="selectionChange"
        @current-change="currentRowChange">
        <el-table-column type="selection" v-if="config.selection"/>
        <el-table-column type="index" v-if="config.showIndex" label="#"/>

        <template v-for="col in config.columns">
          <af-table-column v-if="!col.tableHidden" :key="col.prop"
            :label="col.i18n ? $t(`forms.${col.i18n}`) : col.label"
            :prop="col.prop"
            :width="col.width || undefined">
            <template slot-scope="{row}">
              <slot :name="'col.'+col.prop" :row="row">
                {{row[col.prop]}}
              </slot>
            </template> 
          </af-table-column>
        </template>

        <af-table-column fixed="right" v-if="config.showAction">   
          <template slot-scope="{row}">
            <slot name="action" :row="row">
            </slot>
          </template>  
        </af-table-column>
      </el-table>
    </ResponsivePanel>

    <div class="d-table__pager" v-if="config.page">
      <el-pagination background
        layout="total, prev, pager, next"
        :total="pageInfo.total"
        :current-page.sync="pageInfo.current"
        :page-size.sync="pageInfo.size"
        @current-change="pageChange"
        @size-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" src="./DTable.ts"></script>

<style lang="scss">
@import "@/styles/variables.scss";
.d-table {
  flex: auto;
  display: flex;
  flex-direction: column;
  min-height: 40vh;
  .d-table__title {
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

  .d-table__commandbar {
    width: 100%;
  }

  .d-table__main {
    flex: auto;
    padding:0 16px;
    background-color: white;
  }

  .d-table__pager {
    background-color: white;
    .el-pagination {
      margin: {
        top: 8px;
        bottom: 8px;
        right: 16px;
      }
      text-align: right;
    }
    
  }
}
</style>