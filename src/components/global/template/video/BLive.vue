<template>
    <div class="b-live">
        <!-- <iframe v-if="valid" :src="url" scrolling="no" 
            border="0" frameborder="no" framespacing="0" 
            allowfullscreen="true"> 
        </iframe> -->
        <div v-if="valid" class="d-valign" style="height: 100%;">
            <el-button @click="openWindow">{{$t("blive_openwindow")}}</el-button>
        </div>
        <div v-else class="d-valign" style="height: 100%;">
            <h3>{{$t("empty")}}</h3>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement } from 'vue';

@Reflect.metadata("component:category", "video")
@Component
export default class BLive extends Vue {
    /** 房间号 */
    @Prop()
    roomid!: string;

    get valid() {
        return this.roomid && /[0-9]+/.test(this.roomid);
    }

    get url() {
        return `//live.bilibili.com/${this.roomid}?from=ddmonitor`;
    }

    openWindow() {
        const height = screen.availHeight * 0.5;
        const width = screen.availWidth * 0.5;
        window.open(this.url, "", [
            "toolbar=yes",
            "menubar=yes",
            "height="+height,
            "width="+width,
            // "left="+left,
            // "top="+top
        ].join(","));
    }
}
</script>
<i18n>
{
    "zh-CN": {
        "blive_openwindow": "小窗口播放"
    },
    "en": {
        "blive_openwindow": "Open Mini Window"
    }
}
</i18n>
<style lang="scss">
.b-live {
    width: 100%;
    height: 100%;
    iframe{
        width: 100%;
        height: 100%;
    }
}
</style>