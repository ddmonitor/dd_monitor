<template>
  <div class="home">
    <el-row>
      <h2>{{$t("template")}}</h2>
    </el-row>
    <el-row>
      <template v-for="(g, key) in data">
        <el-tabs :key="key">
          <el-tab-pane :label="$t(key)"> </el-tab-pane>
        </el-tabs>

        <el-row class="template-container" :gutter="8" type="flex" :key="key + '_content'">
          <el-col v-for="t in g" :key="t.name"
            :md="8" :sm="12" :xs="24" >
            <CornerTag :type="modeColorMap[t.meta.mode]">
              <el-card @click.native="selectTemplate(t)">
                <div class="img-wrapper">
                  <img v-if="t.meta.icon" :src="t.meta.icon"/>
                </div>
                <span class="title">
                  {{getText(t.meta.name)}}
                </span>
                <div v-html="t.meta.description">
                  {{getText(t.meta.description)}}
                </div>
              </el-card>

              <span slot="tag">
                {{$t('template_modes.' + t.meta.mode)}}
              </span>
            </CornerTag>
            
          </el-col>
        </el-row>
      </template> 
    </el-row>
    <el-row style="margin-top:16px;">
      <el-col>如果页面没有显示最新版，请尝试清除浏览器缓存</el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import templates from "@/router/template";
import { RouteConfig } from 'vue-router';
import { getText } from "@/util/uitl";
@Component({})
export default class Home extends Vue {

  data = templates.groupBy(t => t.meta.category || "default");
  getText = getText;
  modeColorMap = {
    "standard": "",
    "window" : "success",
    "mobile": "warning",
    "common": "info"
  };

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
        border-color: rgba(255, 255, 255, 0.4);
        color: white;
        box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.1);
        &:hover, &:focus {
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