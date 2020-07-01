<template>
  <div class="d-table">
    <div v-if="config.title" class="d-table__title">
      <slot name="title" :config="config">
        <h2>{{config.title}}</h2>
      </slot>
    </div>

    <ResponsivePanel class="d-table__main">
      <el-table ref="$table" :data="data" 
         height="100%"
        :highlight-current-row="true"
        @selection-change="selectionChange"
        @current-change="currentRowChange">
        <el-table-column type="selection" v-if="config.selection"/>
        <el-table-column type="expand" v-if="config.tree"/>
        <el-table-column type="index" v-if="config.showIndex" label="#"/>

        <af-table-column v-for="col in config.columns" :key="col.prop"
          :label="col.i18n ? $t(`forms.${col.i18n}`) : col.label"
          :prop="col.prop"
          :width="col.width || undefined">
          <template slot-scope="{row}">
            <slot :name="'col.'+col.prop" :row="row">
              {{row[col.prop]}}
            </slot>
          </template> 
        </af-table-column>

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
    border-bottom: 1px solid #DCDFE6;
    h2 {
      text-align: center;
      margin: 0;
      line-height: 40px;
      font-size: 1.6em;
    }
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