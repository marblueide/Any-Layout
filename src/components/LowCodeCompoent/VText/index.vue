<template>
  <div class="text" flex :style="style">{{ propValue.value }}</div>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";

const props = defineProps<{
  propValue: {
    value: string;
  };
  style?: StyleValue;
}>();
</script>

<style scoped lang="scss">
.text {
  width: 100%;
  height: 100%;
}
</style>
