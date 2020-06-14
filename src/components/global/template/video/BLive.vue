<template>
  <div class="b-live" v-loading="loading">
    <el-card class="d-w100">
      <div style="display: flex;" v-if="scriptActive">
        <div class="live-cover" v-if="liveInfo.cover">
          <CornerTag :type="liveInfo.liveStatus ? 'success' : 'info'">
            <img :src="liveInfo.cover" />
            <span slot="tag">{{liveInfo.liveStatus?$t("blive_live"):$t("blive_nolive")}}</span>
          </CornerTag>
        </div>
        <div class="live-info d-content-m">
          <template v-if="roomidValue" class="d-h100">
            <div class="user-info d-valign" v-show="userInfo.name">
              <el-avatar :size="48" :src="userInfo.face"></el-avatar>
              <div class="user-name">{{userInfo.name}}</div>
              <el-tag effect="dark" size="small"
                :type="userInfo.is_followed?'success':'info'" >
                {{userInfo.is_followed?$t('blive_follow'):$t('blive_notfollow')}}
              </el-tag>
            </div>
            <div class="d-flex-fill" v-show="userInfo.name">{{liveInfo.title}}</div>
            <div class="button-section">
              <el-button type="primary" @click="openWindow">{{$t("blive_open")}}</el-button>
              <el-button @click="openMiniWindow">{{$t("blive_openmini")}}</el-button>
            </div>
          </template>
          <div v-else class="d-flex-v d-h100">
            <h3>{{$t("empty")}}</h3>
          </div>
        </div>
      </div>
      <div v-else class="d-flex-v">
        <div>{{$t("blive_noscript")}}</div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from "vue-property-decorator";
import { CreateElement } from 'vue';
import { getLiveInfo, getUserInfo } from '@/api/bili';
import { State } from 'vuex-class';

@Reflect.metadata("component:category", "video")
@Component
export default class BLive extends Vue {

  @Prop()
  uid!: number;

  @State("isScriptActive")
  scriptActive!: boolean;

  roomidValue = 0;

  liveInfo: {
    roomid: number;
    url: number;
    cover: string;
    title: string;
    online: number;
    roomStatus: number;
    liveStatus: number;
  } = {} as any;
  userInfo: any = {};
  loading = false;

  get url() {
    return `//live.bilibili.com/${this.roomidValue}`;
  }

  @Watch("uid")
  onUidChange() {
    this.loadLive();
  }



  async loadLive() {
    try {
      this.loading = true;

      const res = await getLiveInfo(this.uid);
      this.liveInfo = res.data;
      this.roomidValue = res.data.roomid;

      const res2 = await getUserInfo(this.uid);
      this.userInfo = res2.data;
    } catch (error) {
      this.$message.error(error.message || error);
    } finally {
      this.loading = false;
    }
  }
  openWindow() {
    window.open(this.url);
  }
  openMiniWindow() {
    const height = screen.availHeight * 0.5;
    const width = screen.availWidth * 0.5;
    window.open(this.url + "?from=ddmonitor", "", [
      "toolbar=yes",
      "menubar=yes",
      "height=" + height,
      "width=" + width,
      // "left="+left,
      // "top="+top
    ].join(","));
  }
}
</script>
<i18n>
{
    "zh-CN": {
        "blive_open": "观看",
        "blive_openmini": "小窗口播放",
        "blive_live": "直播中",
        "blive_nolive": "未开播",
        "blive_follow": "正在关注",
        "blive_notfollow": "未关注",
        "blive_noscript": "请安装脚本"
    },
    "en": {
        "blive_open": "Watch",
        "blive_openmini": "Open Mini Window",
        "blive_live": "Live",
        "blive_nolive": "Offline",
        "blive_follow": "Following",
        "blive_notfollow": "Not Following",
        "blive_noscript": "Please install script first"
    }
}
</i18n>
<style lang="scss">
.b-live {
  width: 100%;
  max-height: 240px;
  .live-cover {
    height: 200px;
    width: auto;
    img {
      height: 100%;
      width: auto;
      display: block;
    }
  }
  .live-info {
    flex: auto;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    .user-info {
      .user-name {
        font-size: 24px;
        margin-left: 16px;
      }
      .el-tag {
        margin-left: 16px;
      }
    }
    .button-section {
      display: flex;
      justify-content: center;
    }
  }
}
</style>