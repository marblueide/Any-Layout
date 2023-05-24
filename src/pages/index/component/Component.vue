<template>
  <div class="card" bg-white cursor-pointer rounded-2>
    <div text-center h-16>
      <i
        class="iconfont"
        :class="parseComponetData(component.ComponentData).icon"
        inline-block
        text-3xl
        text-center
        rounded-full
      >
      </i>
      <div mt-2>
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

function parseComponetData(json: string): LowCanvasData {
  return JSON.parse(json);
}
</script>

<style scoped lang="scss">
.card {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  aspect-ratio: 1/ 1;
}
</style>
