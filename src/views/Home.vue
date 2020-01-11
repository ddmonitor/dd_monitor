<template>
  <DWrap>
    <test></test>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import test from "./template/t3_1.vue"
@Component({
  components: {
    test
  }
})
export default class Home extends Vue {

}
</script>
<style lang="scss">
.home {
  height: 100%;
  width: 100%;

}
</style>