import { useLowStore } from '../stores/useLowStore';
<template>
  <div class="editor-header" box-border h-20 border="b-1 gray-2" items-center p-4 flex>
    <el-button m-x-1>JSON</el-button>
    <el-button m-x-1 @click="handleBack" :disabled="stackIndex == 0">撤销</el-button>
    <el-button m-x-1 @click="reset">重做</el-button>
    <el-button m-x-1>插入图片</el-button>
    <el-button m-x-1>预览</el-button>
    <el-button m-x-1 @click="save">保存</el-button>
    <el-button m-x-1 @click="clearCanvas">清空画布</el-button>
  </div>
</template>

<script setup lang="ts">
import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";

const store = useLowStore();
const { lowCanvasState, stackIndex } = storeToRefs(store);

const handleBack = () => {
  store.backSnapshot();
};

const reset = () => {
  store.init();
};

const clearCanvas = () => {
  store.clearCanvas();
};

const save = () => {
  localStorage.setItem("CanvasState", JSON.stringify(lowCanvasState.value));
};
</script>

<style lang="scss" scoped>

</style>
