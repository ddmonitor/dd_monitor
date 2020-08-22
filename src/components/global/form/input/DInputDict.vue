<template>
  <el-select v-model="myValue" class="d-input-rdict"
    filterable :clearable="!required">
      <el-option v-for="i in data" :key="i.itemValue" class="d-input-dict__item"
        :label="i.itemName" :value="i.itemValue" value-key="itemValue">
        <span>{{i.itemName}}</span>
      </el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { getDict} from "@/api/system/dict";
import { Page } from '../crud';
@Component
export default class DInputDict extends Vue {

    @Prop()
    value!: number | null;

    @Prop({ type: String, required: true })
    dictKey!: string;

    @Prop({ type: Boolean, default: false })
    required!: boolean;

    get myValue() {
        return this.value;
    }
    set myValue(v) {
        if (!v && v !== 0) {
            v = null;
        }
        this.$emit("input", v);
    }

    data: {
        itemValue: number,
        itemName: string
    }[] = [];

    mounted() {
        if (this.myValue) {
            this.data = [{ itemName: "Loading...", itemValue: this.myValue }];
        }
        this.loadData();
    }

    async loadData() {
        const res = await getDict(this.dictKey);
        this.data = res.data.data.items;
    }
}
</script>

<style lang="scss">

</style>