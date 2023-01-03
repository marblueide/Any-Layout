<template>
  <div class="text">
<<<<<<< HEAD
    <el-form-item label="内容">
      <el-input
        placeholder="请输入内容"
        :model-value="currentComponent?.propValue.value"
        @input="handleChange('value', $event)"
      ></el-input>
    </el-form-item>
=======
    <el--form-item label="内容">
      <el-input
        placeholder="请输入内容"
        :model-value="value"
        @input="handleChange('value', $event)"
      ></el-input>
    </el--form-item>
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { useLowStore } from "@/stores/useLowStore";
import { useAttr } from "./useAttr";
const store = useLowStore();
const { currentComponent } = useAttr();
=======
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useLowStore } from "../../../stores/useLowStore";
const store = useLowStore();
const { currentComponent } = storeToRefs(store);

//@ts-ignore
const { value } = toRefs(currentComponent.value?.propValue);
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91

const handleChange = (key: any, value: any) => {
  store.setCurrentProps({
    [key]: value,
  });
};
</script>

<style></style>
