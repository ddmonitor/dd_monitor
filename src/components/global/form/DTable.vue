<template>
  <ResponsivePanel>
    <avue-crud>
      <template slot="menuLeft"></template>
    </avue-crud>
  </ResponsivePanel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { AvueCrud } from "@smallwei/avue";
@Component
export default class DTable extends Vue {

}
</script>

<style>
</style>