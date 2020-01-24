<template>
  <div class="app-bar">
    <transition name="slide">
      <div class="app-bar__wrapper" v-show="expand">
        <img src="/img/dd.png" class="logo"/>
        <router-link class="title" to="/">
            {{$t("appName")}}
        </router-link>
        <div class="app-bar__menu">
          <AppMenu :menu="$menu" />
        </div>
        <div class="app-bar__buttons">
          <el-tooltip 
            content="GitHub" 
            placement="bottom">
            <el-button size="small" circle icon="fab fa-github" @click="openGithub">
            </el-button>
          </el-tooltip>

          <el-tooltip 
            :content="scriptActive?$t('buttons.script_active'):$t('buttons.script_offline')" 
            placement="bottom">
            <el-button size="small" circle  @click="installScript">
              <i class="fa fa-link" v-if="scriptActive"></i>
              <i class="fa fa-link" v-else style="color: red;"></i>
            </el-button>
          </el-tooltip>
          
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

<script lang="tsx">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { CreateElement, VNode } from 'vue';
import { State, Getter, Mutation} from "vuex-class";
import menu, { MenuItem } from "@/config/menu";
import lang from "@/config/lang.json";
import AppMenu from "@/components/AppMenu";
import { StoreBinding } from '@/util/vuex';
import { addDOMListenerOnce } from '@/util/event';
import { ComponentMessageEvent } from '@/types/message/message';
import { Route } from 'vue-router';
@Component({
  components: {
    AppMenu
  }
})
export default class AppBar extends Vue {

    @StoreBinding("SET_LANGUAGE")
    language!: string;

    @StoreBinding("TOGGLE_SCRIPT_STATE", "isScriptActive")
    scriptActive!: boolean;

    languages = lang.mapItem((v, k) => ({
      label: v,
      value: k
    }));

    expand = true;

    $menu: MenuItem[] = [];

    created() {
      this.$menu = menu;
    }

    mounted() {
      addDOMListenerOnce(this, "message", this.onMessage);
    }

    changeLanguage(lang: string) {
      this.language = lang
    }

    toggleExpand() {
      this.expand = !this.expand;
    }

    installScript() {
      window.open("/ddhelper.user.js");
    }

    openGithub() {
      window.open("https://github.com/ddmonitor/dd_monitor");
    }

    onMessage(e: ComponentMessageEvent) {
      if (e.data.type === "M_SCRIPT_INIT") {
        this.scriptActive = true;
      }
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
    background-color: $primary-dark-5;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
  }

  img.logo {
    height: 40px;
    width: auto;
  }
  .title {
    margin-left: 16px;
    font-size: 24px;
    color: white;
    text-decoration: none;
  }
  .app-bar__menu {
    margin-left: 16px;
    margin-right: 16px;
    flex:auto;
    .el-menu {
      border-bottom: none;
      background-color: transparent !important;
      > .el-submenu .el-submenu__title,
      > .el-menu-item {
        display: flex;
        align-items: center;
        i {
          color: unset;
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 16px;
          vertical-align: middle;
        }
      }
    }
  }
  .app-bar__buttons {
    display: flex;
    justify-content: space-between;
    .el-button {
      height: 32px;
      background: none;
      color: white;
    }   
    > * + * {
      margin-left: 8px;
    }

  }

  .arrow {
    position: absolute;
    bottom: -18px;
    left: calc(50% - 20px);
    height: 18px;
    width: 60px;

    background: $primary-dark-5;
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