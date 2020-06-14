<template>
  <div class="holo-schedule">
    <div class="iframe-wrap" v-loading="loading">
      <iframe
        ref="$iframe"
        src="https://schedule.hololive.tv/simple"
        border="0"
        frameborder="no"
        framespacing="0"
        @load="onLoad"
      >
        <!-- allowfullscreen="true" scrolling="no"-->
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { CreateElement } from 'vue';

@Reflect.metadata("component:category", "source")
@Component
export default class HoloSchedule extends Vue {
  @Ref()
  $iframe!: HTMLIFrameElement;

  loading = true;

  onLoad() {
    this.loading = false;
  }
}
</script>

<style lang="scss">
.holo-schedule{
  width: 100%;
  height: 100%;
  .iframe-wrap {
    width: 100%;
    height: 100%;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>