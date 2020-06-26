<template>
  <DWrap class="home" style="padding:16px">
    <el-row :gutter="16">
      <el-col :span="18" :offset="3" :xs="{ span: 24, offset: 0}">
        <el-card style="height:600px;">
          <div slot="header" class="card-title">
            <span>{{today.toLocaleDateString()}} {{$t("forms.bili_calendar.$name")}}</span>
            <el-button type="text" 
              style="margin-left:16px"
              icon="fa fa-info-circle"
              @click="openCalendar"
            />
              
          </div>

          <el-table :data="programs" v-loading="loading">
            <el-table-column prop="start_time" :label="$t('forms.bili_calendar.start_time')" 
              width="80">
              <div slot-scope="{row}">
                {{formatTime(row.start_time)}}
              </div>
            </el-table-column>
            <af-table-column prop="ruid" :label="$t('forms.bili_calendar.ruid')" 
              width="180">
              <div slot-scope="{row}" class="col-anchor">
                <template v-if="vtbs[row.ruid]">
                  <el-avatar size="small" :src="vtbs[row.ruid].face" ></el-avatar>
                  <span>{{vtbs[row.ruid].uname}}</span>
                </template>
                
              </div>
            </af-table-column>
            <af-table-column prop="title" :label="$t('forms.bili_calendar.title')"  />
            <el-table-column prop="room_id" width="80">
              <div slot-scope="{row}">
                <el-button type="primary" size="small"
                  @click="watch(row.room_id)" >
                  {{$t("actions.media.watch")}}
                </el-button>
              </div>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col></el-col>
      <el-col></el-col>
      <el-col></el-col>
    </el-row>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class';
import { formatDate } from "@/util/util";
import { getCalendar } from "@/api/bili";
@Component
export default class Home extends Vue { 
  @State("isScriptActive")
  scriptActive!: boolean;

  mounted() {
    if (this.scriptActive) {
      this.init();
    }
  }

  get day() {
    return this.today.getDate();
  }

  formatTime(timestamp: number) {
    return formatDate(new Date(timestamp * 1000), "hh:mm");
  }

  programs: any[] = [];
  vtbs: {
    [uid: number]: any;
  } = {};

  today = new Date();
  loading = false;

  async init() {
    try {
      this.loading = true;
      const res = await getCalendar(formatDate(this.today, "yyyy-MM"));
      const data = res.data.program_infos;
      this.vtbs = res.data.user_infos;

      const todayData = data[this.today.getDate()];
      if (todayData) {
        this.programs = todayData.program_list;
      }
    } finally {
      this.loading = false;
    }
  }

  watch(roomid: number) {
    window.open("//live.bilibili.com/" + roomid);
  }

  openCalendar() {
    window.open("https://live.bilibili.com/p/html/live-web-calendar/index.html#/follow");
  }
}
</script>
<style lang="scss">
.home {
  .el-table {
    .col-anchor {
      display: flex;
      width: 100%;
      align-items: center;
      > * + * {
        margin-left: 8px;
      }
    }
  }
}
</style>