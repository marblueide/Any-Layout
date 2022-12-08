<template>
  <div
    class="shape"
    z-1
    :style="style"
    @mousedown="handleMouseDown"
    cursor-move
  >
    <div class="rataion-point"></div>
    <template v-if="currentComponent?.id == id">
      <div
        class="shape-point"
        @mousedown.stop="handlePointDown($event, point)"
        z-1
        absolute
        rounded-10
        bg-white
        cursor-n-resize
        border="1 blue-6"
        v-for="point in pointList"
        :style="getPointStyle(point)"
      ></div>
    </template>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { StyleValue } from "vue";
import { useLowStore } from "../../stores/useLowStore";

const props = defineProps<{
  style: StyleValue;
  id: string;
}>();
const store = useLowStore();
const { currentComponent } = storeToRefs(store);
const pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  store.setCurrentComponent(props.id);
  //@ts-ignore
  const { left, top } = currentComponent.value.style;
  console.log(left, top);
  const startX = e.clientX;
  const startY = e.clientY;

  const move = (e: MouseEvent) => {
    const endX = e.clientX;
    const endY = e.clientY;
    const curX = endX - startX + left;
    const curY = endY - startY + top;
    store.setCurrentComponentStyle({
      left: curX,
      top: curY,
    });
  };

  const up = () => {
    //@ts-ignore
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    store.recordSnapshot();
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const getPointStyle = (point: string): StyleValue => {
  const canvasData = store.getCanvasDataById(props.id);
  let hasT = point.includes("t");
  let hasB = point.includes("b");
  let hasL = point.includes("l");
  let hasR = point.includes("r");
  let left, top;

  if (point.length == 2) {
    //@ts-ignore
    left = hasL ? 0 : canvasData.style.width;
    //@ts-ignore
    top = hasT ? 0 : canvasData.style.height;
  } else {
    if (hasL || hasR) {
      //@ts-ignore
      left = hasL ? 0 : canvasData.style.width;
      //@ts-ignore
      top = canvasData.style.height / 2;
    }
    if (hasT || hasB) {
      //@ts-ignore
      left = canvasData.style.width / 2;
      //@ts-ignore
      top = hasT ? 0 : canvasData.style.height;
    }
  }

  return {
    left: left + "px",
    top: top + "px",
  };
};

const handlePointDown = (e: MouseEvent, point: string) => {
  e.preventDefault();
  store.setCurrentComponent(props.id);
  //@ts-ignore
  const { width, height, left, top } = currentComponent.value!.style;
  const startX = e.clientX;
  const startY = e.clientY;

  const hasT = point.includes("t");
  const hasB = point.includes("b");
  const hasL = point.includes("l");
  const hasR = point.includes("r");

  const move = (e: MouseEvent) => {
    const endX = e.clientX;
    const endY = e.clientY;
    let addW = endX - startX,
      addH = endY - startY;

    if (point.length == 2) {
      addW = hasL ? -addW : addW;
      addH = hasT ? -addH : addH;
    } else {
      if (hasT || hasB) {
        addW = 0;
        addH = hasT ? -addH : addH;
      }
      if (hasL || hasR) {
        addW = hasL ? -addW : addW;
        addH = 0;
      }
    }
    let l = hasL ? left - addW : left;
    let t = hasT ? top - addH : top;
    let w = addW + width;
    let h = addH + height;
    if (w < 0) {
      w = Math.abs(w);
      l = l - w;
    }
    if (h < 0) {
      h = Math.abs(h);
      t = t - h;
    }
    store.setCurrentComponentStyle({
      width: w,
      height: h,
      left: l,
      top: t,
    });
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    store.recordSnapshot();
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const handleRatation = (e: MouseEvent) => {};
</script>

<style scoped lang="scss">
.shape {
  position: absolute;

  .shape-point {
    height: 8px;
    width: 8px;
    transform: translate(-50%, -50%);
  }
}
</style>
