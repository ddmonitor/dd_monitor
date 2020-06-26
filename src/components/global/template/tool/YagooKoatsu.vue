<template>
  <div class="yagoo-koatsu">
    <div class="player-container">
      <aplayer :audio="audio" ref="player" :lrcType="3"
        @play="onPlay" @pause="onPause"/>
      <div class="visual">
        <div class="volume-bar">
          <div class="bar" ref="bar" style="width:50%;">
            <span>血压</span>
          </div>
          <div class="space">
          </div>
        </div>
        <div class="avatar-wrap">
          <div class="bg d-fill">

          </div>
          <img class="d-fill" src="/img/yagoo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { CreateElement } from 'vue';
import { APlayer } from "@moefe/vue-aplayer";

type MediaComponent = APlayer.Media & Vue & {
  audio: HTMLAudioElement;
};

@Reflect.metadata("component:category", "tool")
@Component
export default class YagooKoatsu extends Vue {
  @Ref()
  player!: APlayer & { media: MediaComponent };

  @Ref()
  bar!: HTMLDivElement;

  get element() {
    return this.player.media.audio;
  }

  audio: APlayer.Audio = {
    name: "Shiny Smily Story",
    artist: "hololive IDOL PROJECT",
    url: "/audio/sss.mp3",
    cover: "/audio/sss.jpg",
    lrc: "/audio/sss.lrc",
    theme: "#49c8f0"
  };

  ctx: AudioContext = null as any;
  analyser: AnalyserNode = null as any;
  renderId = 0;

  mounted() {
    this.init();
  }

  init() {
    try {
      const ctx: AudioContext = this.ctx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
      const source = ctx.createMediaElementSource(this.element);
      const analyser = this.analyser = ctx.createAnalyser();
      source.connect(analyser);
      analyser.connect(ctx.destination);
    } catch (error) {
      this.$message.warning("AudioContext does not supportted!")
    }
  }

  onPlay() {
    this.beginRender();
  }
  onPause() {
    cancelAnimationFrame(this.renderId);
  }

  beginRender() {
    this.renderId = requestAnimationFrame(this.beginRender);

    const count = this.analyser.frequencyBinCount; // 1024
    const block = 10;
    const span = count / block;

    let data = new Uint8Array(count);
    this.analyser.getByteTimeDomainData(data);
    // 切块后，取最中间两块的平均数
    const middle2 = data.slice((block / 2 - 1) * span, block / 2 * span);
    const v = middle2.reduce((s, v)=> s + v, 0) / middle2.length;
    this.bar.style.width = (v / 255 * 100) + "%";
  }

}
</script>

<style lang="scss">
.yagoo-koatsu {
  width: 100%;
  border-radius: 3px;
  color: black;
  background-color: white;
  .player-container {
    width: 100%;
    height: 96px;
    display: flex;
    align-items: center;

    .aplayer {
      box-shadow: none;
      flex: auto;
      max-width: 60%;
    }

    .visual {
      flex: auto;
      display: flex;
      align-items: center;
      .volume-bar {
        flex: auto;
        height: 24px;
        display: flex;
        background: linear-gradient(to right, lime, 70%, yellow 90%, red);
        .bar {
          height: 100%;
          background: white;
          > span {
            white-space: nowrap;
            color: black;
          }
        }
        .space {
          height: 100%;
          flex: auto;
          background: transparent;
          position: relative;
          
        }
      }
      .avatar-wrap {
        margin-left: 8px;
        margin-right: 8px;
        position: relative;
        height: 80px;
        width: 80px;
        img {
          display: block;
        }
        .bg {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 100;
        }
      }
    }
  }
}
</style>