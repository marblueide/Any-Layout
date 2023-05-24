<template>
  <el-select
    :style="style"
    :disabled="isPreView ? false : true"
    class="disabled select"
    :placeholder="propValue.placeholder"
    :filterable="propValue.filterable"
    :multiple="propValue.multiple"
    v-model="value"
  >
    <el-option
      v-for="item in propValue.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import type { EventType } from "@/types/LowCode/event";
import { storeToRefs } from "pinia";
import { ref, watch, type StyleValue, watchEffect } from "vue";

const { isPreView } = storeToRefs(appStore.state);



const props = defineProps<{
  propValue: {
    options: any[];
    placeholder: string
    filterable: boolean
    multiple:boolean
  };
  style?: StyleValue;
  event?: EventType;
}>();

const value = ref<string | Array<any>>( '')

watch(() => props.propValue.multiple, (v) => {
  if (v) {
   value.value = [] 
  } else {
    value.value = ""
  }
})

watchEffect(() => {
  if (!isPreView.value) {
    value.value =props.propValue.multiple ? [] : ''
  }
})

</script>

<style scoped lang="scss">
.disabled {
  cursor: pointer !important;
  & > * {
    cursor: pointer !important;
  }
  :deep(.el-input__wrapper) {
    background-color: white !important;
  }
}

.select {
  width: 100%;
  height: 100%;
  :deep(.select-trigger) {
    width: 100%;
    height: 100%;
    .el-input {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
