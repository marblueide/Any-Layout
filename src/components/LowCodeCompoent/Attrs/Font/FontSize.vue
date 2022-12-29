<template>
  <div class="font-size">
    <el-form-item label="字体大小">
      <el-input
        placeholder="16"
        :model-value="currentComponent?.style.fontSize"
        type="number"
        @update:modelValue="handleChange('fontSize', $event)"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { useAttr } from "../useAttr";

const { currentComponent, handleChange } = useAttr();
</script>

<style scoped lang="scss"></style>
