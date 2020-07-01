<template>
  <el-card class="d-tree">
    <el-tree :data="tree" :props="{ label: 'name' }" node-key="id" 
      :expand-on-click-node="false"
      @current-change="selectItem">
      <span class="tree-node" slot-scope="{ data }">
        <span v-if="showCode">{{ data.code }}</span>
        <span>{{ data.name }}</span>
      </span>
    </el-tree>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TreeItem } from '@/types/common/Tree';

@Component
export default class DTree extends Vue {
  @Prop({ type: [Number, String] })
  value!: number | string;

  @Prop({ type: Array, default: () => [] })
  tree!: TreeItem<any>[];

  @Prop({ type: Boolean, default: true })
  showCode!: boolean;

  selectItem(item: TreeItem<any>) {
    this.$emit("input", item.id);
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.el-card.d-tree {
  height: 100%;
  .el-card__body {
    height: 100%;
    .el-tree {
      height: 100%;
      overflow-y: auto;
      .el-tree-node {
        .el-tree-node__content {
          height: auto;
          .el-icon-caret-right:before {
            font-size: 18px;
          }
        }
        .tree-node {
          padding: 8px 4px;
          font-size: 20px;
        }

        &.is-current {
          > .el-tree-node__content:first-child {
            background-color: $primary-light-5;
            color: white;
          }
        }
      }
      
    }
  }
}
</style>