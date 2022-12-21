<template>
  <div class="text">
    <el--form-item label="内容">
      <el-input
        placeholder="请输入内容"
        :model-value="value"
        @input="handleChange('value', $event)"
      ></el-input>
    </el--form-item>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useLowStore } from "../../../stores/useLowStore";
const store = useLowStore();
const { currentComponent } = storeToRefs(store);

//@ts-ignore
const { value } = toRefs(currentComponent.value?.propValue);

const handleChange = (key: any, value: any) => {
  store.setCurrentProps({
    [key]: value,
  });
};
</script>

<style></style>
