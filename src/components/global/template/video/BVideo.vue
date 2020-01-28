<template>
    <div class="b-video">
        <iframe v-if="valid" :src="url" scrolling="no" 
            border="0" frameborder="no" framespacing="0" 
            allowfullscreen="true"> 
        </iframe>
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
export default class BVideo extends Vue {
    /** AV号 */
    @Prop()
    aid!: string;

    /** 分P */
    @Prop({ default: 1 })
    page!: number;

    get valid() {
        return this.aid && /[0-9]+/.test(this.aid);
    }

    get url() {
        return `//player.bilibili.com/player.html?aid=${this.aid}&page=${this.page}`;
    }
}
</script>

<style lang="scss">
.b-video {
    width: 100%;
    height: 100%;
    iframe{
        width: 100%;
        height: 100%;
    }
}
</style>