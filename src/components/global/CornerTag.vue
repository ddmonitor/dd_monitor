<template>
  <div class="corner-tag">
      <div class="corner-tag__body d-fill">
          <slot></slot>
      </div>
      <div class="corner-tag__tag">
          <svg class="d-fill">
              <path class="triangle" :class="type" d="M0,0 L60,0 0,60 Z"/>
          </svg>
          <span class="content d-flex-v">
              <slot name="tag"></slot>
          </span>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CornerTag extends Vue { 
    @Prop({ default: '' })
    type!: "" | "success" | "info" | "warning" | "danger";
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
// 网传牛顿法开平方
@function sqrt($num) {
    $temp:1;
    @while abs($temp - $num / $temp) > 1e-6 {
        $temp: ($temp + $num/$temp) / 2;
    }
    @return $temp;
}
$corner-tag-size: 60px;
.corner-tag {
    height: 100%;
    position: relative;
    .corner-tag__tag {
        z-index: 1000;
        position: absolute;
        left: 0;
        top: 0;
        width: $corner-tag-size;
        height: $corner-tag-size;
        .content {
            z-index: 1500;
            position: absolute;
            left: (-$corner-tag-size / 8) * sqrt(2);
            top: ($corner-tag-size / 8) * sqrt(2);
            width: 100%;
            height: auto;

            transform: rotate(-45deg);
            white-space: nowrap;
        }
        svg {
            > path.triangle {
                fill: $--color-primary;
                &.success {
                    fill: $--color-success;
                }
                &.info {
                    fill: $--color-info ;
                }
                &.warning {
                    fill: $--color-warning;
                }
                &.danger {
                    fill: $--color-danger;
                }
            }
        }

    }
    .corner-tag__body {
        > * {
            height: 100%;
        }
    }
}
</style>