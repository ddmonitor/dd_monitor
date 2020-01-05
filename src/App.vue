<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    window.addEventListener("message", e => {
      console.log(e.data, e.origin)
    })
  },
}
</script>

<style>

</style>
