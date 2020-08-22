<template>
<div class="d-form">
  <div v-if="mode=='view'|| mode=='approval' || mode=='userView'"
    class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
    <div class="el-table__body-wrapper">
      <table class="el-table__body" v-if="myValue">
        <tbody>
          <tr v-for="(row, i) in myColumns" 
            :key="'row_'+i"
            class="el-table__row" :class="{'el-table__row--striped': i%2==1}">
            <template v-for="col in row">
              <th style="width:160px" :key="'label_'+col.prop">
                <div class="cell">
                  <span>{{col.i18n ? $t(`forms.${col.i18n}`) : col.label}}</span>
                </div>
              </th>
              <td :key="'col_'+col.prop" :colspan="Math.ceil(col.colSpan / 12) * 2 - 1">
                <div class="cell">
                  <span>{{col.presentProp ? myValue[col.presentProp] : myValue[col.prop]}}</span>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <el-row v-else
    type="flex" justify="center">
    <el-col :xs="24" :sm="20" :md="18" :lg="16" >
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
                  <!-- <template v-if="mode=='view'|| mode=='approval' || mode=='userView'">
                    <span>{{col.presentProp ? myValue[col.presentProp] : myValue[col.prop]}}</span>
                  </template>
                  <template v-else> -->
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
                    <el-select v-else-if="col.type=='select'" 
                      v-model="myValue[col.prop]" 
                      :disabled="col.readonly" 
                      :clearable="!col.required">
                      <el-option v-for="i in col['select.options']" :key="i.value"
                        :label="i.label" :value="i.value" value-key="value">
                        <span>{{i.label}}</span>
                      </el-option>
                    </el-select>
                    <el-input v-else-if="col.type=='image'"
                      v-model="myValue[col.prop]" 
                      type="url"
                    />

                    <d-input-ref v-else-if="col.type=='ref'" 
                      v-model="myValue[col.prop]" 
                      :disabled="col.readonly"
                      :required="col.required"
                      :refKey="col['ref.refKey']"
                    />
                    <d-input-dict v-else-if="col.type=='dict'" 
                      v-model="myValue[col.prop]" 
                      :disabled="col.readonly"
                      :required="col.required"
                      :dictKey="col['dict.dictKey']"
                    />

                    <el-input v-else
                      v-model="myValue[col.prop]" 
                      :type="col.type"
                    />
                  <!-- </template> -->
                </slot>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script lang="ts" src="./DForm.ts"></script>

<style lang="scss">
.d-form {
  background-color: white;
  height: 1vh;
  flex: auto;
  .el-table {
    height: 100%;
    width: 75%;
    margin: 0 auto;
    .el-table__body-wrapper {
      height: 100%;
      width: auto;
      overflow-y: auto;
      .el-table__body {
        width: 100%;
        td {
          min-width: 160px;
        }
      }
    }
  }
}
</style>