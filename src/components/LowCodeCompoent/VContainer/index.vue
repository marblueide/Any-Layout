<template>
  <el-card class="container" :shadow="propValue.shadow" w="100%" h="100%" box-border :style="style">
  </el-card>
</template>

<script setup lang="ts">
/** __vue_virtual_code_placeholder */
import type { StyleValue } from "vue";

const props = defineProps<{
  style?: StyleValue;
  propValue: {
    shadow:string
  };
}>();
</script>

<style scoped lang="scss"></style>
