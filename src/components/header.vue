<template>
  <div class="editor-header" box-border h-20 border="b-1 gray-2" items-center p-4 flex>
    <el-button m-x-1>JSON</el-button>
    <el-button m-x-1 @click="handleBack" :disabled="stackIndex == 0">撤销</el-button>
    <el-button m-x-1 @click="handleForward" :disabled="stackIndex == stack.length - 1">回退</el-button>
    <el-button m-x-1>预览</el-button>
    <el-button m-x-1 @click="save">保存</el-button>
    <el-button m-x-1 @click="clearCanvas">清空画布</el-button>
    <el-button m-x-1 @click="init">初始化</el-button>
    <el-button m-x-1 @click="compose" :disabled="areaData.components.length == 0">组合</el-button>
    <el-button m-x-1 :disabled="!Array.isArray(currentComponent?.propValue)">拆分</el-button>
    <div class="canvas-size" grid h-10 w-80 items-center mx-2>
      <span color-gray-7>画布大小</span>
      <el-input :model-value="lowCanvasState.width" type="number" @input="handleInput('width', +$event)">
      </el-input>
      <el-input :model-value="lowCanvasState.height" type="number" @input="handleInput('height', +$event)">
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLowStore } from "@/stores/useLowStore";
import { values } from "lodash-es";
import { storeToRefs } from "pinia";

const store = useLowStore();
const { lowCanvasState, lowCanvasData, stackIndex, stack, areaData, currentComponent } = storeToRefs(store);

const handleBack = () => {
  store.backSnapshot();
};

const handleForward = () => {
  store.forwardSnapshot();
};

const clearCanvas = () => {
  store.clearCanvas();
};

const init = () => {
  store.init();
};

const save = () => {
  localStorage.setItem("CanvasState", JSON.stringify(lowCanvasState.value));
  localStorage.setItem("CanvasData", JSON.stringify(lowCanvasData.value));
};

const compose = () => {
  store.compose()
  store.recordSnapshot()
}

const handleInput = (key: string, val: number) => {
  store.setLowCanvasState({
    [key]: val,
  });
}
</script>

<style lang="scss" scoped>
.editor-header {
  .canvas-size {
    grid-template-columns: auto 1fr 1fr;
    grid-column-gap: 0.5rem;

    span {
      font-size: 0.8rem;
    }
  }
}
</style>
