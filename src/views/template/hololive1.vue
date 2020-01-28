<template>
  <DWrap>
    <table class="t t3-1">
      <tr>
        <td rowspan="2" style="height:100%;width:30%">
          <div>
            <HoloSchedule />
          </div>
        </td>
        <td><div><YoutubeVideo :id="ids[0]" /></div></td>
      </tr>
      <tr>
        <!-- <td></td> -->
        <td><div><YoutubeVideo :id="ids[1]" /></div></td>
      </tr>
    </table>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { addDOMListenerOnce } from "@/util/event";
import { ComponentMessageEvent } from "@/types/message/message";
import { Meta, TemplateMeta } from '@/util/vue';
@Component
export default class hololive1 extends Vue {

  @Meta({
    name: "hololive schedule",
    category: "hololive",
    description: "Hololive schedule with 2 Youtube stream windows.",
    path: "hololive1",
    icon: "/img/template/hololive.webp",
    mode: "standard"
  })
  metadata!: TemplateMeta;

  ids = ["", ""];
  current = 0;

  mounted() {
    addDOMListenerOnce(this, "message", this.onMessage);
  }

  onMessage(e: ComponentMessageEvent) {
    if (e.data.type === "M_OPEN_U_LINK") {
      const url = e.data.data.url;
      const m = /\?v=([A-Za-z0-9-_]+)$/.exec(url);
      if (m) {
        this.$set(this.ids, this.current, m[1]);
        // 点击链接时，交替改变视频面板
        this.current = (this.current + 1) % 2;
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.t3-1 {
  height: 100%;
  width: 100%;
  td {
    padding: 8px;
    width: 50%;
    height: 50%;
    > div {
      background-color: rgba(255,255,255,0.8);
      height: 100%;
      width: 100%;
    }
  }
}
</style>