<template>
  <el-select :style="style" :modelValue="propValue.value" :disabled="true" class="disabled">
    <el-option
      v-for="item in propValue.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import type { EventType } from "@/types/LowCode/event";
import type { StyleValue } from "vue";

const props = defineProps<{
  propValue: {
    options: any[];
    value: any;
  };
  style?: StyleValue;
  event?: EventType;
}>();
</script>

<style scoped lang="scss">
    .disabled{
        cursor: pointer !important;
        & > * {
            cursor: pointer !important;
        }
        :deep(.el-input__wrapper){
            background-color: white !important;
        }
    }
</style>
