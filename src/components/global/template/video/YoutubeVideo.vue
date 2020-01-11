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
export default class YoutubeVideo extends Vue {
    /** 视频id */
    @Prop(String)
    id!: string; 

    get valid() {
        return this.id && /[A-Za-z0-9-_]+/.test(this.id);
    }

    get url() {
        return `https://www.youtube.com/embed/${this.id}?` + {
            rel: 1,
            playlist: this.id,
            showinfo: 0,
            enablejsapi: 1
        }.entryList()
        .map(([k, v]) => k + "=" + v)
        .join("&");
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