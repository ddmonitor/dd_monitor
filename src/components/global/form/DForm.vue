<template>
<el-row class="d-form" type="flex" justify="center">
  <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="12" >
    <el-form v-if="myValue" ref="$form"
      :model="myValue"
      label-width="160px"  >
      <el-row :gutter="16">
        <template v-for="col in columns">
          <el-col v-if="!col.formHidden"
            :key="'col_'+col.prop" 
            :xs="24"
            :span="col.colSpan || 12">
            <el-form-item :prop="col.prop" 
              :required="col.required"
              :label="col.i18n ? $t(`forms.${col.i18n}`) : col.label">
              <slot :name="'form.' + col.prop" :value="myValue" :mode="mode">
                <template v-if="mode=='view'|| mode=='approval' || mode=='userView'">
                  <span>{{col["ref.labelProp"] ? myValue[col["ref.labelProp"]] : myValue[col.prop]}}</span>
                </template>
                <template v-else>
                  <el-input v-if="col.type=='number'" 
                    v-model.number="myValue[col.prop]" 
                    :disabled="col.readonly"
                    type="number"
                  />
                  <el-input-number v-else-if="col.type=='range'" 
                    v-model="myValue[col.prop]" 
                    :disabled="col.readonly"
                    :min="col['range.min']" :max="col['range.max']"
                  />
                  <el-switch v-else-if="col.type=='switch'" 
                    v-model="myValue[col.prop]" 
                    :disabled="col.readonly"
                  />
                  <el-date-picker v-else-if="col.type=='date'" 
                    v-model="myValue[col.prop]" 
                    :disabled="col.readonly"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                  <el-time-picker v-else-if="col.type=='time'" 
                    v-model="myValue[col.prop]" 
                    :disabled="col.readonly"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />

                  <d-input-ref v-else-if="col.type=='ref'" 
                    v-model="myValue[col.prop]" 
                    :disabled="col.readonly"
                    :required="col.required"
                    :refKey="col['ref.refKey']"
                  />
                  <el-input v-else
                    v-model="myValue[col.prop]" 
                    :type="col.type"
                  />
                </template>
              </slot>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </el-col>
</el-row>
</template>

<script lang="ts" src="./DForm.ts"></script>

<style lang="scss">
.d-form {
  background-color: white;
}
</style>