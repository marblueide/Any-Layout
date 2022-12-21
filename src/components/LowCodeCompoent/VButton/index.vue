<template>
  <button
    class="btn"
    :style="style"
    inline-block
    box-border
    flex
    bg-white
    border="1 sold gray-2"
    cursor-pointer
    hover="bg-lightblue-1 color-blue-5 border-blue-2"
    transition
    v-bind="{ ...propValue }"
  >
    {{ propValue.value }}
  </button>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
const propps = defineProps<{
  propValue: {
    value: string;
  };
  style?: StyleValue;
}>();
</script>

<style scoped lang="scss">
.btn {
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 0.8rem;
}
</style>
