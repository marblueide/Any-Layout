<template>
  <div class="component" bg-white cursor-pointer rounded-2>
    <div text-center h-16>
      <i
        class="iconfont"
        :class="parseComponetData(component.ComponentData)?.icon"
        inline-block
        text-3xl
        text-center
        rounded-full
      >
      </i>
      <div mt-2 overflow-hidden text-ellipsis  >
        {{ component.componentName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LowCanvasData } from "@/types";
import type { Component } from "@/types/model/Component";

const props = defineProps<{
  component: Component;
}>();

function parseComponetData(json: string): LowCanvasData | undefined {
  try {
    return JSON.parse(json);
  } catch (error) {}
}
</script>

<style scoped lang="scss">
.component {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  border: 1px solid transparent;
  aspect-ratio: 1/ 1;
  transition: all 0.3s;
  &:hover{
    border: 1px solid #dcdcdc;
  }
}
</style>
