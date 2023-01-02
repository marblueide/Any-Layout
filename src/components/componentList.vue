<template>
  <div class="componentList" grid p-3 items-center items-baseline box-border>
    <div
      class="component-item"
      @dragstart="handleDragStart"
      draggable="true"
      cursor="grab"
      border="gray-2 1"
      w-20
      h-12
      py-2
      px-4
      box-border
      flex
      items-center
      rounded-1
      justify-center
      v-for="(item, index) in componentList"
      :data-index="index"
    >
      <i class="iconfont" :class="item.icon"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { componentList } from "./LowCodeCompoent/component-list";
const handleDragStart = (e: DragEvent) => {
  //@ts-ignore
  e.dataTransfer.setData("index", e.target.dataset.index);
};
</script>

<style scoped lang="scss">
.componentList {
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  .component-item {
    margin: 0 auto;

    i {
      font-size: 1.7rem;
    }
  }
}
</style>
