<template>
  <div class="d-toolbar" :class="{ 'd-toolbar--inline': mode=='inline' }">
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

          <template v-if="mode == 'inline'">
            <el-button v-if="cmd.type == 'button' || !cmd.type" 
              :key="'btn_'+ cmd.command.name"
              size="mini" type="text"
              :icon="cmd.command.icon"
              :disabled="!cmd.executable"
              @click="onCommand(cmd)">
              {{$t(cmd.command.text)}}
            </el-button>
          </template>
          <template v-else>
              <el-button v-if="cmd.type == 'button' || !cmd.type" 
              :key="'btn_'+ cmd.command.name"
              :size="cmd.size || 'small'" 
              plain
              :icon="cmd.command.icon"
              :disabled="!cmd.executable"
              @click="onCommand(cmd)">
              {{$t(cmd.command.text)}}
            </el-button>
          </template>
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

  @Prop({ type: String, default: "top" })
  mode!: "top" | "inline"

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
  display: inline-flex;
  > * + * {
    margin-left: 16px;
  }

  &.d-toolbar--inline {
    padding: 0 8px;
    justify-content: space-between;
    background-color: transparent;
  }

}
</style>