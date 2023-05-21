<template></template>

<script setup lang="ts">
import type { EventType } from "@/types/LowCode/event";
import type { StyleValue } from "vue";

const props = defineProps<{
  propValue: {
    options: any[];
  };
  style?: StyleValue;
  event: EventType;
}>();
</script>

<style></style>
