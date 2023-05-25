<template>
  <el-progress
    :text-inside="true"
    :stroke-width="26"
    v-bind="props.propValue"
    h="100%"
  />
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import type { EventType } from "@/types/LowCode/event";
import { storeToRefs } from "pinia";
import type { StyleValue } from "vue";

const { isPreView } = storeToRefs(appStore.state);

const props = defineProps<{
  propValue: {
    percentage: number;
    status: string;
    striped: boolean;
    stripedFlow: boolean;
  };
  style?: StyleValue;
  event?: EventType;
}>();
</script>

<style scoped lang="scss"></style>
