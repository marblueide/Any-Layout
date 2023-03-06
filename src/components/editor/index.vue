<template>
  <div id="editor" class="editor" ref="editorRef" overflow="hidden" :style="editorStyle" @drop="handleDrop"
    @dragover="handleDragOver" @mousedown.stop.prevent="handleMouseDown">
    <!-- <Grid :width="lowCanvasState.width" :height="lowCanvasState.height" /> -->
    <Shape v-for="item in lowCanvasData" :id="item.id!" :key="item.id!" :style="getShapeStyle(item.style)">
      <component :is="item.component()" :propValue="item.propValue" :style="getOriginStyle(item.style)">
      </component>
    </Shape>
    <Area v-bind="{ ...areaData }" v-show="isShowArea" @mousedown.stop.prevent="handleAreaDwon" />
    <MarkLine />
  </div>
</template>

<script setup lang="ts">
import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";
import { computed, ref, reactive, type StyleValue } from "vue";
import {
  getShapeStyle,
  getOriginStyle,
  getComponentRotatedStyle,
} from "../../utils/style";
import { componentList } from "@/components/LowCodeCompoent/component-list";
import { cloneDeep } from "lodash-es";
import type { LowCanvasData } from "../../types/LowCode/index";
import type { ComponentStyle } from "@/types/LowCode/style";

const store = useLowStore();
const { lowCanvasState, lowCanvasData, areaData, isShowArea, currentComponent } =
  storeToRefs(store);
const editorRef = ref();
let editorRect: DOMRect;

const editorStyle = computed(() => {
  return {
    width: lowCanvasState.value.width + "px",
    height: lowCanvasState.value.height + "px",
    background: lowCanvasState.value.background,
    opacity: lowCanvasState.value.opacity,
    transform: `scale(${lowCanvasState.value.scale})`,
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
  let top = e.clientY - editorRect.y - height! / 2;
  left =
    left < 0
      ? 0
      : left >= lowCanvasState.value.width - width!
        ? lowCanvasState.value.width - width!
        : left;
  top =
    top < 0
      ? 0
      : top >= lowCanvasState.value.height - height!
        ? lowCanvasState.value.height - height!
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

const selectComponentSet = reactive<Set<string>>(new Set());

const handleMouseDown = (e: MouseEvent) => {
  if (!editorRect) editorRect = editorRef.value.getBoundingClientRect();
  const startX = e.clientX;
  const startY = e.clientY;

  store.setCurrentComponent();
  store.setIsShowArea(true);
  selectComponentSet.clear();
  store.setAreaData({
    left: startX - editorRect.left,
    top: startY - editorRect.top,
    width: 0,
    height: 0,
    components: [],
  });

  const move = (e: MouseEvent) => {
    const endX = e.clientX;
    const endY = e.clientY;
    store.setAreaData({
      width: endX - startX,
      height: endY - startY,
    });
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    let l = Infinity,
      t = Infinity,
      r = -Infinity,
      b = -Infinity;
    lowCanvasData.value.forEach((item) => {
      //@ts-ignore
      const { left, top, width, height } = getComponentRotatedStyle(item.style);
      if (
        left &&
        top &&
        width &&
        height &&
        left >= areaData.value.left &&
        left <= areaData.value.left + areaData.value.width &&
        top >= areaData.value.top &&
        top <= areaData.value.top + areaData.value.height
      ) {
        selectComponentSet.add(item.id!);
        l = Math.min(l, left);
        t = Math.min(t, top);
        r = Math.max(r, left + width);
        b = Math.max(b, top + height);
      }
    });
    if (selectComponentSet.size > 1) {
      store.setAreaData({
        left: l,
        top: t,
        width: r - l,
        height: b - t,
        components: [...selectComponentSet],
      });
    }
    store.setIsShowArea(selectComponentSet.size > 1);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const handleAreaDwon = (e: MouseEvent) => {
  const { left, top } = areaData.value;
  const startX = e.clientX;
  const startY = e.clientY;
  const componetPos: ComponentStyle[] = [];
  const data: LowCanvasData[] = []
  selectComponentSet.forEach((id) => {
    data.push(store.getComponentById(id)!)
  });

  data.forEach(item => {
    componetPos.push(cloneDeep(item.style));
  })

  const move = (e: MouseEvent) => {
    const endX = e.clientX;
    const endY = e.clientY;
    const disX = endX - startX;
    const disY = endY - startY;

    store.setAreaData({
      left: left + disX,
      top: top + disY,
    });

    let index = 0;
    data.forEach((item) => {
      const { left, top } = componetPos[index++];
      item && store.setComponentStyle(item.id!, {
        left: left + disX,
        top: top + disY,
      });
    });
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
</script>

<style scoped lang="scss">
.editor {
  position: relative;
}
</style>
