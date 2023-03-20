<template>
  <div class="tabs-default">
    <el-tabs type="border-card">
      <el-tab-pane label="画布属性">
        <el-form>
          <el-form-item label="不透明度">
            <el-slider
              :modelValue="lowCanvasState.opacity"
              :min="0"
              :max="1"
              :step="0.01"
              @input="handleChange('opacity', +$event)"
            />
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker
              :modelValue="lowCanvasState.background"
              @change="handleChange('background', $event)"
            />
          </el-form-item>
          <el-form-item label="缩放比">
            <el-slider
              :modelValue="lowCanvasState.scale"
              :min="1"
              :max="3"
              :step="0.1"
              @input="handleChange('scale', +$event)"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import { storeToRefs } from "pinia";
import type { LowCanvasType } from "../types/LowCode/index";

const { lowCanvasState } = storeToRefs(appStore.state);
const { setLowCanvasState } = appStore.state;

const handleChange = <
  k extends keyof LowCanvasType,
  v extends LowCanvasType[k]
>(
  key: k,
  value: v
) => {
  let v = value;
  if (key === "background" && v == null) {
    //@ts-ignore
    v = "#fff";
  }
  setLowCanvasState({
    [key]: v,
  });
};
</script>

<style scoped lang="scss">
.tabs-default {
  :deep(.el-tabs--border-card) {
    border: none;
  }

  :deep(.el-form-item__label) {
    margin-right: 0.2rem;
  }

  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
  }
}
</style>
