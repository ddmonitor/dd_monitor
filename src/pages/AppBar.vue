<template>
  
  <div class="app-bar">
    <transition name="slide">
      <div class="app-bar__wrapper" v-show="expand">
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
    </transition>

    <div class="arrow" :class="{'is-expand': expand}" @click="toggleExpand"></div>
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
    readonly language!: string;

    @Mutation
    SET_LANGUAGE!: (lang: string) => void;

    languages = lang.mapItem((v, k) => ({
      label: v,
      value: k
    }));

    expand = true;

    changeLanguage(lang: string) {
      this.SET_LANGUAGE(lang);
    }

    toggleExpand() {
      this.expand = !this.expand;
    }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.app-bar {
  width: 100%;
  position: relative;
  .app-bar__wrapper {
    height: 60px;
    width: 100%;
    background-color: $primary-dark-3;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    color: white;
  }

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

  .arrow {
    position: absolute;
    bottom: -16px;
    left: calc(50% - 20px);
    height: 16px;
    width: 40px;

    background: $primary-dark-1;
    text-align: center;
    font-size: 12px;
    border-radius: 0 0 5px 5px;
    cursor: pointer;

    &::before {
      content: '▼';
      display: inline-block;
    }
    &.is-expand::before {
      content: '▲';
      display: inline-block;
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all ease .2s;
  }
  .slide-enter, .slide-leave-to {
    height: 0;
    opacity: 0;
  }
}
</style>