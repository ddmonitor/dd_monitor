<template>
  <el-select v-model="myValue" class="d-input-ref"
    filterable :clearable="!required">
      <el-option v-for="i in data" :key="i.id" class="d-input-ref__item"
        :label="i.name" :value="i.id" value-key="id">
        <span>{{i.code}}</span>
        <span>{{i.name}}</span>
      </el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { getRefList } from "@/api/system/metaref";
import { Page } from '../DTable';
@Component
export default class DInputRef extends Vue {

    @Prop()
    value!: number | null;

    @Prop({ type: String, required: true })
    refKey!: string;

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
        id: number,
        code?: string,
        name: string
    }[] = [];

    page: Page = {
        current: 1,
        size: 100,
        total: 1
    }

    mounted() {
        this.loadData();
    }

    async loadData() {
        const res = await getRefList(this.refKey, this.page.current, this.page.size);
        this.page.total = res.data.data.total;
        this.data = res.data.data.data;
    }
}
</script>

<style lang="scss">
.d-input-ref {

}
.d-input-ref__item {
    display: flex;
    justify-content: space-between;
}
</style>