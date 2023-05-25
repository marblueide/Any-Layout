<template>
  <el-pagination
    layout="prev, pager, next"
    :total="propValue.total"
    :pager-count="propValue.pagerCount"
    :small="propValue.small"
    :page-size="propValue.pageSize"
    :disabled="isPreView ? true : false"
    v-model:current-page="value"
  />
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import type { EventType } from "@/types/LowCode/event";
import { storeToRefs } from "pinia";
import { ref, watch, type StyleValue, watchEffect } from "vue";

const { isPreView } = storeToRefs(appStore.state);

const props = defineProps<{
  propValue: {
    total: number;
    pagerCount: number;
    pageSize: number;
    small: boolean;
  };
  style?: StyleValue;
  event?: EventType;
}>();

const value = ref(1);
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
