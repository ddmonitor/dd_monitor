<template>
  <div class="app-bar">
      <img src="/img/dd.png" class="logo"/>
      <div class="title">
          {{$t("appName")}}
      </div>
      <div style="flex:auto"></div>
      <div class="app-bar__buttons">
          <el-dropdown trigger="click" @command="changeLanguage">
            <el-tooltip :content="$t('buttons.language')" placement="bottom">
              <span class="el-button el-button--small is-round" >
                <i class="fa fa-globe"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </el-tooltip>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="lang in languages" :key="lang.value"
                :command="lang.value" 
                :class="{'is-select': language == lang.value}">
                {{lang.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from 'vue';
import { State, Getter, Mutation} from "vuex-class";

import lang from "@/config/lang.json";
@Component
export default class AppBar extends Vue {

    @State
    language!: string;

    @Mutation
    SET_LANGUAGE!: (lang: string) => void;

    languages = lang.mapItem((v, k) => ({
      label: v,
      value: k
    }));

    changeLanguage(lang: string) {
      this.SET_LANGUAGE(lang);
    }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.app-bar {
  height: 60px;
  width: 100%;
  background-color: $primary-dark-3;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  color: white;

  img.logo {
    height: 40px;
    width: auto;
  }
  .title {
    margin-left: 16px;
    font-size: 24px;
  }
  .app-bar__buttons {
    display: flex;
    justify-content: space-between;
    .el-button {
      background: none;
      color: white;
    }   
  }
}
</style>