<template>
  <div class="text">
    <el-form-item label="内容">
      <el-input
        placeholder="请输入内容"
        :model-value="currentComponent?.propValue.value"
        @input="handleChange('value', $event)"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { useLowStore } from "@/stores/useLowStore";
import { useAttr } from "./useAttr";
const store = useLowStore();
const { currentComponent } = useAttr();

const handleChange = (key: any, value: any) => {
  store.setCurrentProps({
    [key]: value,
  });
};
</script>

<style></style>
