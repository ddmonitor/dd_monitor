<template>
  <div class="page-404">
      <div>
          <h1>404</h1>
      </div>
      
      <div class="error">
        <pre>{{msg}}</pre>
      </div>
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Page404 extends Vue {
    @Prop()
    error!: Error | null;

    get msg() {
        if (this.error) {
            return this.error + "";
        } else {
            return "Uncaught (in promise) DDError: \nThe specific target was not found.\n" +
            "    at Matsuri.install (saikou.js:114:514)\n" +
            "    at gacha (yagoo.js:18)\n" +
            "    at init (homolive.js:17)";
        }
    }
}
</script>

<style lang="scss" scoped>
.page-404 {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 4em;
    }
    .error {
        font-size: 24px;
        max-width: 75%;
        pre {
            display: block;
            margin: 0;
            padding: 0;
            color: red;
            font-family: Consolas,'Courier New', Courier, monospace;
            height: 40vh;
            overflow-y: auto;
        }
    }
}
</style>