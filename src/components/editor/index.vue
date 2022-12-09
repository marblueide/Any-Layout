<template>
  <div class="editor" ref="editorRef" overflow="hidden" :style="editorStyle" @drop="handleDrop"
    @dragover="handleDragOver" @mousedown.stop.prevent="handleMouseDown">
    <Grid :width="lowCanvasState.width" :height="lowCanvasState.height" />
    <Shape v-for="item in lowCanvasData" :id="item.id!" :key="item.id!" :style="getShapeStyle(item.style)">
      <component :is="item.component()" :propValue="item.propValue"></component>
    </Shape>
    <Area v-bind="{ ...areaStyle }" v-show="isShowArea" @mousedown.stop.prevent="handleAreaDwon" />
  </div>
</template>

<script setup lang="ts">
import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";
import { computed, ref, reactive, onUpdated, onBeforeUpdate, watch, type StyleValue, toRaw } from 'vue';
import { getShapeStyle } from "../../utils/style";
import { componentList } from "@/components/LowCodeCompoent/component-list";
import Grid from "./Grid.vue";
import Shape from "./Shape.vue";
import { cloneDeep } from "lodash-es";
import type { LowCanvasData } from '../../types/LowCode/index';

const store = useLowStore();
const { lowCanvasState, lowCanvasData } = storeToRefs(store);
const editorRef = ref();
let editorRect: DOMRect;

const editorStyle = computed(() => {
  return {
    width: lowCanvasState.value.width + "px",
    height: lowCanvasState.value.height + "px",
    background: lowCanvasState.value.background,
    opacity: lowCanvasState.value.opacity,
    transform: `scalc(${lowCanvasState.value.scale})`,
  };
});

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const data = cloneDeep(
    componentList[e.dataTransfer?.getData("index") as unknown as number]
  );
  if (!data) return;
  if (!editorRect) editorRect = editorRef.value.getBoundingClientRect();
  //@ts-ignore
  const { width, height } = data.style;
  //@ts-ignore
  let left = e.clientX - editorRect.x - width / 2;
  let top = e.clientY - editorRect.y - height / 2;
  left =
    left < 0
      ? 0
      : left >= lowCanvasState.value.width - width
        ? lowCanvasState.value.width - width
        : left;
  top =
    top < 0
      ? 0
      : top >= lowCanvasState.value.height - height
        ? lowCanvasState.value.height - height
        : top;
  //@ts-ignore
  data.style.left = left;
  //@ts-ignore
  data.style.top = top;
  store.addLowCanvasData(data);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

//处理选择框
const areaStyle = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0
})

const selectComponentSet = reactive<Set<LowCanvasData>>(new Set())

const isShowArea = ref(false)

const handleMouseDown = (e: MouseEvent) => {
  if (!editorRect) editorRect = editorRef.value.getBoundingClientRect();
  const startX = e.clientX
  const startY = e.clientY

  store.setCurrentComponent()
  isShowArea.value = true
  selectComponentSet.clear()
  areaStyle.left = startX - editorRect.left
  areaStyle.top = startY - editorRect.top
  areaStyle.width = 0;
  areaStyle.height = 0

  const move = (e: MouseEvent) => {
    const endX = e.clientX
    const endY = e.clientY;
    areaStyle.width = endX - startX
    areaStyle.height = endY - startY
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    lowCanvasData.value.forEach(item => {
      //@ts-ignore
      const { left, top, width, height } = item.style
      if (left >= areaStyle.left && left <= areaStyle.left + areaStyle.width && top >= areaStyle.top && top <= areaStyle.top + areaStyle.height) {
        selectComponentSet.add(item)
        l = Math.min(l, left)
        t = Math.min(t, top)
        r = Math.max(r, left + width)
        b = Math.max(b, top + height)
      }
    })
    if (selectComponentSet.size > 1) {
      areaStyle.left = l
      areaStyle.top = t
      areaStyle.width = r - l
      areaStyle.height = b - t
    }
    isShowArea.value = selectComponentSet.size > 1
  }

  document.addEventListener('mousemove', move)
  document.addEventListener("mouseup", up)
}

const handleAreaDwon = (e: MouseEvent) => {
  const { left, top } = areaStyle
  const startX = e.clientX
  const startY = e.clientY
  const componetPos: StyleValue[] = []
  selectComponentSet.forEach(item => {
    //@ts-ignore
    componetPos.push(cloneDeep(item.style))
  })

  const move = (e: MouseEvent) => {
    const endX = e.clientX
    const endY = e.clientY
    const disX = endX - startX
    const disY = endY - startY;

    areaStyle.left = left + disX
    areaStyle.top = top + disY
    let index = 0
    selectComponentSet.forEach((item) => {
      //@ts-ignore
      const { left, top } = componetPos[index++];
      store.setComponentStyle(item.id as string, {
        left: left + disX,
        //@ts-ignore
        top: top + disY
      })
    })
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener("mouseup", up)
}
</script>

<style scoped lang="scss">
.editor {
  position: relative;
}
</style>
