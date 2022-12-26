<template>
  <div class="background">
    <el-form-item>
      <el-color-picker
        :model-value="background"
        @change="handleChange('background', $event)"
      />
    </el-form-item>
    <el-form-item label="应用背景色">
      <el-input
        :model-value="background"
        @input="handleChange('background', $event)"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useLowStore } from "../../../stores/useLowStore";
const store = useLowStore();
const { currentComponent } = storeToRefs(store);

//@ts-ignore
const { background } = toRefs(currentComponent.value?.style);

const handleChange = (key: string, value: any) => {
  store.setCurrentComponentStyle({
    [key]: value,
  });
};
</script>

<style></style>
