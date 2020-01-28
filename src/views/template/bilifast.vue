<template>
  <DWrap class="d-valign">
    <div class="d-valign">
      <el-form style="width:75%">
        <el-form-item>
          <el-input v-model="id" placeholder="请输入房间号"/>
        </el-form-item>
      </el-form>
      <BLive :roomid="id" style="height:auto" />
    </div>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { addDOMListenerOnce } from "@/util/event";
import { ComponentMessageEvent } from "@/types/message/message";
import { Meta, TemplateMeta } from '@/util/vue';
@Component
export default class hololivebili extends Vue {

  @Meta({
    name: "bilibili 直播极速版",
    category: "bilibili",
    description: "bilibili直播冲国dd特供，一键多开小窗",
    path: "bilifast",
    icon: "/img/template/bilibili.png",
    mode: "window"
  })
  metadata!: TemplateMeta;

  id = "";

  mounted() {
    
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.t {
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