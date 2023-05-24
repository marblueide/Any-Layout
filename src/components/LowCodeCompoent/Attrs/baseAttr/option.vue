<template>
  <div class="option">
    <el-table :data="modelValue">
      <el-table-column label="label" prop="label"> 
        <template #default="{row}">
            <el-input v-model="row.label"/>
        </template>
      </el-table-column>
      <el-table-column label="value" prop="value">
        <template #header>
          <div w="100%" flex justify-between>
            <div>
                value
            </div>
            <el-button type="primary" @click="handleAdd" :icon="Plus" circle  size="small"/>
          </div>
        </template>
        <template #default="{row}">
            <el-input v-model="row.value"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
} from "@element-plus/icons-vue";
import { ref, watchEffect } from "vue";
const props = withDefaults(
  defineProps<{
      modelValue: {label:string,value:any}[];
  }>(),
  {}
);

const data = ref<{ label: string, value: any }[]>([])
let index = 1

watchEffect(() => {
    data.value = props.modelValue
})


const emits = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: any) {
  emits("update:modelValue", value);
}

const handleAdd = () => {
    data.value.push({
        label: "label" + index,
        value:"value" + index
    })
    index++
    handlerUpdate(data.value)
}
</script>

<style></style>
