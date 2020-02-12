<template>
  <div class="responsive" >
    <div class="responsive__embed d-scroll">
      <slot ></slot>
    </div>
  </div>
</template>

<script>

/**
 * 自适应大小容器，针对canvas，iframe等需要固定尺寸的内容，或者是滚动容器
 */
export default {
  name: 'ResponsivePanel'
}
</script>

<style lang="scss">
.responsive {
  position: relative;
  display: flex;
  align-items: stretch;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .responsive__embed {
    border: none;
    padding: 0;
    transition: 0.2s ease;
    flex: auto;
    width: 1vw;

    & > canvas,
    & > iframe,
    & > object,
    & > embed {
      height: 100%;
      width: 100%;
      border: none;
      display: block;
    }
  }
}
</style>