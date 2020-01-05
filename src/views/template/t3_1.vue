<template>
  <DWrap>
    <table class="t t3-1">
      <tr>
        <td rowspan="2" style="height:100%">
          <div>
            <HoloSchedule />
          </div>
        </td>
        <td><div><BVideo :aid="id[0]" /></div></td>
      </tr>
      <tr>
        <!-- <td></td> -->
        <td><div><YoutubeVideo :id="id[1]" /></div></td>
      </tr>
    </table>
  </DWrap>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  id = [
    // "78859960",
    // "RrsGNMMghKM"
  ];
}
</script>
<style lang="scss">
.t3-1 {
  height: 100%;
  width: 100%;
  td {
    padding: 8px;
    width: 50%;
    height: 50%;
    > div {
      background-color: #aaa;
      height: 100%;
      width: 100%;
      border: 1px solid #7a7a7a;
    }
  }
}
</style>