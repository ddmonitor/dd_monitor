<template>
  <div class="d-table">
    <div v-if="config.title" class="d-table__title">
      <h2>{{config.title}}</h2>
    </div>
    <ResponsivePanel>
      <el-table ref="$table" :data="data" class="d-table__main" height="100%"
        :highlight-current-row="true"
        @selection-change="onSelectionChange"
        @current-change="onCurrentRowChange">
        <el-table-column type="selection" v-if="config.selection"/>
        <el-table-column type="expand" v-if="config.tree"/>
        <el-table-column type="index" v-if="config.showIndex"/>

        <af-table-column v-for="col in config.columns" :key="col.prop"
          :label="col.i18n ? $t(`forms.${col.i18n}`) : col.label"
          :prop="col.prop"
          :width="col.width || undefined">

        </af-table-column>

        <af-table-column fixed="right" v-if="config.showAction">
          
        </af-table-column>
      </el-table>
    </ResponsivePanel>
    
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
    border-bottom: 1px solid #7f7f7f;
    h2 {
      text-align: center;
      margin: 0;
      line-height: 40px;
      font-size: 2em;
    }
  }
  .d-table__main {
    flex: auto;
  }
}
</style>