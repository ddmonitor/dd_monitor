<template>
  <div class="d-toolbar">
    <template v-for="cmd in commands">
      <slot :name="'cmd.'+cmd.command.name" :bind="cmd">
        <el-tooltip 
          :disabled="!cmd.command.tooltip" 
          placement="bottom">
          <template slot="content">
            <VNodeRender  v-if="typeof cmd.command.tooltip === 'function'"
              :contentRender="cmd.command.tooltip" :args="[cmd]"/>
            <span v-else>{{$t(cmd.command.tooltip)}}</span>
          </template>

          <el-button v-if="cmd.type == 'button' || !cmd.type" 
            :key="'btn_'+ cmd.command.name"
            plain :size="cmd.size || 'small'" 
            :icon="cmd.command.icon"
            :disabled="!cmd.executable"
            @click="onCommand(cmd)">
            {{$t(cmd.command.text)}}
          </el-button>
        </el-tooltip>
      </slot>
    </template>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { UICommandBinding } from "@/types/command/Command";

@Component
export default class ToolBar extends Vue {
  @Prop({ type: Array, default: () => [] })
  commands!: UICommandBinding[];

  onCommand(cmd: UICommandBinding) {
    this.$emit("command", cmd);
  }
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