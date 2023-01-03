<template>
  <div class="background">
    <el-form-item>
      <el-color-picker
<<<<<<< HEAD
        :model-value="currentComponent?.style.background"
=======
        :model-value="background"
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
        @change="handleChange('background', $event)"
      />
    </el-form-item>
    <el-form-item label="应用背景色">
      <el-input
<<<<<<< HEAD
        :model-value="currentComponent?.style.background"
=======
        :model-value="background"
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
        @input="handleChange('background', $event)"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
<<<<<<< HEAD
import { useAttr } from "./useAttr";

const { currentComponent, handleChange } = useAttr();

//@ts-ignore
const { background } = toRefs(currentComponent.value?.style);
=======
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
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
</script>

<style></style>
