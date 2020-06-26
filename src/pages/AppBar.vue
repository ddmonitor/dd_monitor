<template>
  <div class="app-bar">
    <transition name="slide">
      <div class="app-bar__wrapper" v-show="expand">
        <img src="/img/dd.png" class="logo"/>
        <router-link class="title" to="/">
            {{$t("appName")}}
        </router-link>
        <div class="app-bar__version">
          <span>{{version}}</span>
        </div>
        <div class="app-bar__menu">
          <AppMenu :menu="$menu" />
        </div>
        <div class="app-bar__buttons">
          <el-popover  placement="bottom" trigger="click">
            <template slot="reference">
              <el-avatar :size="32" :src="biliUser.face" style="cursor: pointer">
                <img src="https://static.hdslb.com/images/akari.jpg"/>
              </el-avatar>
            </template>

            <div>
              <el-row>
                <span style="font-size:18px;font-width:bold;">{{biliUser.uname}}</span>
              </el-row>
              <el-row v-if="biliUser.vipStatus"  type="flex" justify="center">
                <div>
                  <el-tag style="color:white" color="#fb7299" size="medium">大会员</el-tag>
                </div>
              </el-row>
              <el-row>
                <div v-if="!biliUser.isLogin" class="d-flex-v">
                  <div>{{$t("buttons.bili_not_login")}}</div>
                  <el-button size="small"  type="primary" @click="biliLogin">
                    {{$t("buttons.login")}}
                  </el-button>
                </div>
              </el-row>
            </div>
          </el-popover>
          
          <el-tooltip 
            content="GitHub" 
            placement="bottom">
            <el-button size="small" plain circle icon="fab fa-github" @click="openGithub">
            </el-button>
          </el-tooltip>

          <el-tooltip 
            :content="scriptActive?$t('buttons.script_active'):$t('buttons.script_offline')" 
            placement="bottom">
            <el-button size="small" plain circle  @click="installScript">
              <i class="fa fa-link" v-if="scriptActive"></i>
              <i class="fa fa-link" v-else style="color: red;"></i>
            </el-button>
          </el-tooltip>
          
          <el-dropdown trigger="click" @command="changeLanguage">
            <el-tooltip :content="$t('buttons.language')" placement="bottom">
              <span class="el-button el-button--small is-plain is-round" >
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

    <div v-show="false" class="arrow" :class="{'is-expand': expand}" @click="toggleExpand"></div>
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
import { checkLoginState } from "@/api/bili";
@Component({
  components: {
    AppMenu
  }
})
export default class AppBar extends Vue {

    @StoreBinding("SET_LANGUAGE")
    language!: string;

    @State("isScriptActive")
    scriptActive!: boolean;

    @State
    version!: string;

    languages = lang.mapItem((v, k) => ({
      label: v,
      value: k
    }));

    biliUser: any = {};

    expand = true;

    $menu: MenuItem[] = [];

    created() {
      this.$menu = menu;
    }

    mounted() {
      if (this.scriptActive) {
        this.checkBiliLogin();
      }
    }

    @Watch("scriptActive")
    onScriptStateChange() {
      if (this.scriptActive) {
        this.checkBiliLogin();
      }
    }

    async checkBiliLogin() {
      const res = await checkLoginState();
      this.biliUser = res.data;
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

    biliLogin() {
      window.open("https://passport.bilibili.com/login");
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
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }

  img.logo {
    height: 40px;
    width: auto;
  }
  .title {
    margin-left: 16px;
    font-size: 24px;
    text-decoration: none;
  }
  .app-bar__version {
    height: 40px;
    display: flex;
    align-items: flex-end;
    margin-left: 16px;
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
    z-index: 99;

    text-align: center;
    font-size: 12px;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
    background-color: $primary-color;
    color: white;

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