<template>
  <div class="d-toolbar">
      <slot>

      </slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ToolBar extends Vue { 
    
}
</script>

<style lang="scss">
.d-toolbar {
    width: 100%;
    padding: 8px 16px;
    background-color: white;
    > * + * {
        margin-left: 16px;
    }
}
</style>