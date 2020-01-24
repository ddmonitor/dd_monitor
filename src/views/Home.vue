<template>
  <div class="home">
    <el-row>
      <h2>{{$t("template")}}</h2>
      <template v-for="(g, key) in data">
        <el-tabs :key="key">
          <el-tab-pane :label="key"> </el-tab-pane>
        </el-tabs>

        <el-row class="template-container" :gutter="8" :key="key + '_content'">
          <el-col v-for="t in g" :key="t.name"
            :md="8" :sm="12" :xs="24" >
            <el-card shadow="hover" @click.native="selectTemplate(t)">
              <div class="img-wrapper">
                <img v-if="t.meta.icon" :src="t.meta.icon"/>
              </div>
              <span class="title">
                {{t.meta.name}}
                <el-tag size="small" >
                  {{t.meta.mode}}
                </el-tag>
              </span>
              <div v-html="t.meta.description">
                {{t.meta.description}}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template> 
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import templates from "@/router/template";
import { RouteConfig } from 'vue-router';

@Component({})
export default class Home extends Vue {

  data = templates.groupBy(t => t.meta.category || "default");

  selectTemplate(t: RouteConfig) {
    this.$router.push(t.path);
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.home {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  color: white;
  > div {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }

  .el-tabs {
    .el-tabs__item {
      color: $primary-color;
    }
  }

  .template-container {
    .el-col {
      .el-card {
        background-color: $primary-dark-7;
        border-color: transparent;
        color: white;
        &.is-hover-shadow:hover, &.is-hover-shadow:focus {
          box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.1);
          background-color: $primary-dark-5;
          cursor: pointer;
        }
        .el-card__body {
          display: flex;
          flex-direction: column;
          align-items: center;
          > * + * {
            margin-top: 8px;
          }
        }
      }
      .title {
        font-size: 24px;
      }
      .img-wrapper {
        width: 128px;
        height: 128px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }

}
</style>