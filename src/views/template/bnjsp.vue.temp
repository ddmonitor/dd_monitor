<template>
  <DWrap class="t">
    <!-- <table class="t bnjsp">
      <tr>
        <td style="width:30%">
          <div>
            
          </div>
        </td>
        <td rowspan="2" style="height:100%;width:70%">
          <div>
            <iframe frameborder="0" width="100%" height="100%" allowfullscreen="" scrolling="no" 
              allow="autoplay; encrypted-media" 
              src="https://live.bilibili.com/blackboard/bnj2020_room.html?roomId=544641&liteVersion=true&fnElementId=bnj-player-parent-div" 
              style="display: block;"></iframe>
          </div>
        </td>
      </tr>
      <tr>
        <td >
          <div>
            
          </div>
        </td>
      </tr>
    </table> -->
    <el-button @click="openWindows">打开窗口</el-button>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { addDOMListenerOnce } from "@/util/event";
import { ComponentMessageEvent } from "@/types/message/message";
import { Meta, TemplateMeta } from '@/util/vue';
@Component
export default class bnjsp extends Vue {

  @Meta({
    name: "2020拜年祭 + hololive 1st",
    category: "special",
    description: "大窗口：2020bilibili拜年祭<br />" +
    "hololive 1st live直播<br />" +
    "holo四期生评论直播",
    path: "bnj2020sp",
    icon: "/img/template/bnj2020.png",
    mode: "window"
  })
  metadata!: TemplateMeta;
  data: {
    col: number,
    row: number,
    colspan: number,
    rowspan: number,
    width: string,
    height: string,
    url: string
  }[] = [
    {
      col: 2,
      row: 1,
      colspan: 1,
      rowspan: 2,
      width: "70%",
      height: "50%",
      url: "https://live.bilibili.com/blackboard/bnj2020_room.html?roomId=544641&liteVersion=true&fnElementId=bnj-player-parent-div"
    },
    {
      col: 1,
      row: 1,
      colspan: 1,
      rowspan: 1,
      width: "30%",
      height: "50%",
      url: "https://live.bilibili.com/8982686"
    },
    {
      col: 1,
      row: 2,
      colspan: 1,
      rowspan: 1,
      width: "30%",
      height: "50%",
      url: "https://live.bilibili.com/21752686"
    }
  ];
  openWindows() {
    for (const def of this.data) {
      const height = screen.availHeight * parseFloat(def.height) * 0.01;
      const width = screen.availWidth * parseFloat(def.width) * 0.01;
      // const left = screen.availWidth - width;
      // const top = screen.availHeight - height;

      window.open(def.url, "", [
        "toolbar=yes",
        "menubar=yes",
        "scrollbars=yes",
        "height="+height,
        "width="+width,
        // "left="+left,
        // "top="+top
      ].join(","));
    }
  }
  
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.t {
  height: 100%;
  width: 100%;
  &.d-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  td {
    padding: 8px;
    height: 50%;
    > div {
      background-color: rgba(255,255,255,0.8);
      height: 100%;
      width: 100%;
    }
  }
}
</style>