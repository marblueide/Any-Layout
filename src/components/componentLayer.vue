<template>
  <div class="component-layer" box-border border="t-1 gray-2">
    <div
      class="layer-item"
      @click="handleClick(item.id)"
      :class="
        item.id == currentComponent?.id ? 'bg-blue-100 color-blue-500' : ''
      "
      v-for="item in reseverComponentData"
      :key="item.id"
      duration-300
      hover:bg-blue-100
      hover:color-blue-500
      px-3
      py-2
      flex
      justify-between
      items-center
    >
      <div class="left">
        <i class="iconfont" :class="item.icon"></i>
        <span ml-1>{{ item.label }}</span>
      </div>
      <div class="right" op-0 grid>
        <i
          class="iconfont icon-shangfan"
          cursor-pointer
          @click="handleUp(item.id)"
        ></i>
        <i
          class="iconfont icon-xiafan"
          cursor-pointer
          @click="handleDown(item.id)"
        ></i>
        <i
          class="iconfont icon-shanchu"
          cursor-pointer
          @click="handleDelete(item.id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, toRaw } from "vue";
import { cloneDeep } from "lodash-es";
import { appStore } from "@/stores";

const { currentComponent, lowCanvasData } = storeToRefs(appStore.state);
const { setCurrentComponent, deleteComponentDataAndSnapshot } = appStore.state;
const { up, down } = appStore.contextMenu;

const reseverComponentData = computed(() => {
  return cloneDeep(lowCanvasData.value).reverse();
});

const handleClick = (id: string | undefined) => {
  id && setCurrentComponent(id);
};

const handleDelete = (id: string | undefined) => {
  id && deleteComponentDataAndSnapshot(id);
};

const handleUp = (id: string | undefined) => {
  id && up(id);
};

const handleDown = (id: string | undefined) => {
  id && down(id);
};
</script>

<style scoped lang="scss">
.component-layer {
  .layer-item {
    font-size: 0.8rem;

    &:hover,
    &.bg-blue-100 {
      .right {
        opacity: 1;
      }
    }

    .right {
      grid-column-gap: 0.5rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
