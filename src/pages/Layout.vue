<template>
  <div class="app-container">
      <div>
          <AppBar></AppBar>
      </div>
      <div class="app-main">
        <div class="app-left"></div>
        <div class="app-page">
            <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import AppBar from "./AppBar.vue";
@Component({
    components: {
        AppBar
    }
})
export default class Layout extends Vue {
    
}
</script>

<style lang="scss" scoped>
.app-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .app-main {
        flex: auto;
        display: flex;
        height: 1vh;
        .app-page {
            flex: auto;
            background-color: #f6f6f6;
        }
    }
}
</style>