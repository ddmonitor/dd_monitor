<template>
  <el-card class="d-tree">
    <el-tree :data="tree" :props="{ label: 'name' }" node-key="id" 
      :expand-on-click-node="false"
      @current-change="selectItem">
      <span class="d-tree__node" slot-scope="{ data }">
        <span class="node-icon" v-if="showIcon">
          <template v-if="data.icon"> 
            <i v-if="isFontClass(data.icon)" class="node-icon--font" :class="data.icon"></i>
            <img v-else :src="data.icon"  class="node-icon--image"/>
          </template>
        </span>
        <span v-if="showCode" class="node-code">{{ data.code }}</span>
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
  
  @Prop({ type: Boolean, default: true })
  showIcon!: boolean;

  selectItem(item: TreeItem<any>) {
    this.$emit("input", item.id);
  }

  isFontClass(str: string) {
    return /^[a-z0-9]+([a-z0-9-_]+ *)*$/i.test(str);
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.el-card.d-tree {
  height: 100%;
  padding: 0px;
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
        .d-tree__node {
          padding: 8px 4px;
          font-size: 20px;
          > * + * {
            margin-left: 8px;
          }
          .node-icon {
            display: inline-block;
            width: 24px;
            max-height: 24px;
            img {
              width: 100%;
              object-fit: scale-down;
            }
          }
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