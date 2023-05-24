<template>
  <div class="componentList-box">
    <div
      class="card"
      bg-white
      cursor-pointer
      rounded-2
      v-for="it in componentList"
    >
      <div text-center h-16>
        <i
          class="iconfont"
          :class="parseComponetData(it.ComponentData).icon"
          inline-block
          text-3xl
          text-center
          rounded-full
        >
        </i>
        <div mt-2>
          {{ it.componentName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LowCanvasData } from "@/types";
import type { Component } from "@/types/model/Component";
import dayjs from "dayjs";
import { ref } from "vue";

const componentList = ref<Component[]>([
  {
    id: "",
    componentName: "测试",
    ComponentData:
      '{"type":"button","label":"button","name":"button","collapse":["data","event","baseStyle","colorConfig","font","align","border"],"events":{"onClick":{"type":"none"}},"isLock":false,"isRoot":true,"style":{"left":0,"top":0,"width":90,"height":45,"rotate":0,"borderWidth":2,"borderRadius":0,"boxShadow":"none","justifyContent":"center","alignItems":"center","background":"#fff","color":"#000","fontSize":16,"styleBox":true,"padding":"1px 2px 3px 4px","margin":"0 0 0 0","borderColor":"#fff"},"animations":[],"icon":"icon-anniu","linkage":[],"propValue":{"value":"按钮"}}',
    libId: "",
    createTime: "",
    deleteTime: "",
  },
]);

function parseComponetData(json: string): LowCanvasData {
  return JSON.parse(json);
}
</script>

<style scoped lang="scss">
.componentList-box {
  .card {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    aspect-ratio: 1/ 1;
  }
}
</style>
