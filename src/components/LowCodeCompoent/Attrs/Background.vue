<template>
  <div class="background">
    <el-form-item>
      <el-color-picker :model-value="currentComponent?.style.background" @change="handleChange('background', $event)" />
    </el-form-item>
    <el-form-item label="应用背景色">
      <el-input :model-value="currentComponent?.style.background"
        @input="handleChange('background', $event)"></el-input>
      <el-color-picker :model-value="currentComponent?.style.background" @change="handleChange('background', $event)" />
    </el-form-item>
    <el-form-item label="应用背景色">
      <el-input :model-value="currentComponent?.style.background"
        @input="handleChange('background', $event)"></el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useAttr } from "./useAttr";

const { currentComponent, handleChange } = useAttr();

//@ts-ignore
const { background } = toRefs(currentComponent.value?.style);
</script>

<style>

</style>
