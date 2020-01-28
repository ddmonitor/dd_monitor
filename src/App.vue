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
      console.debug(e.data, e.origin);
      if (e.data.type === "M_SCRIPT_INIT") {
        this.$store.commit("TOGGLE_SCRIPT_STATE", true);
      }
    })
  },
}
</script>

<style>

</style>
