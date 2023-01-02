<template>
  <div
    class="shape"
    ref="shapeRef"
    z-1
    :style="style"
    @mousedown.stop.prevent="handleMouseDown"
    :class="
      currentComponent?.id == id
        ? 'cursor-move outline-blue-3 outline-1  outline-solid'
        : ''
    "
  >
    <div
      class="rataion-point"
      absolute
      @mousedown.stop.prevent="handleRatation"
      v-show="currentComponent?.id == id"
    >
      <i class="iconfont icon-xuanzhuan" color-blue-3 cursor-grab></i>
    </div>
    <template v-if="currentComponent?.id == id">
      <div
        class="shape-point"
        @mousedown.stop.prevent="handlePointDown($event, point)"
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
import { nextTick, ref, type StyleValue } from "vue";
import { useLowStore } from "../../stores/useLowStore";
import {} from "@/utils";
import { calculateComponentPositonAndSize } from "../../utils/calculateComponentPositonAndSize";
import emitter from "@/utils/mitt";
import type { pointType } from "@/types";

const props = defineProps<{
  style: StyleValue;
  id: string;
}>();
const store = useLowStore();
const { currentComponent } = storeToRefs(store);
const pointList: pointType[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
const shapeRef = ref();

const handleMouseDown = (e: MouseEvent) => {
  store.setCurrentComponent(props.id);
  const { left, top } = currentComponent.value!.style;
  const startX = e.clientX;
  const startY = e.clientY;

  let isMove = false;
  const move = async (e: MouseEvent) => {
    isMove = true;
    const endX = e.clientX;
    const endY = e.clientY;
    const curX = endX - startX + left!;
    const curY = endY - startY + top!;
    store.setCurrentComponentStyle({
      left: curX,
      top: curY,
    });
    // await nextTick()
    emitter.emit("move", {
      isDown: startY - endY > 0,
      isLeft: startX - endX < 0,
    });
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    isMove && store.recordSnapshot();
    emitter.emit("unMove");
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const getPointStyle = (point: pointType): StyleValue => {
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

const handlePointDown = (e: MouseEvent, point: pointType) => {
  store.setCurrentComponent(props.id);
  const { width, height, left, top, rotate } = currentComponent.value!.style;
  const editorRectInfo = document
    .querySelector("#editor")!
    .getBoundingClientRect();
  // 当前点击坐标
  const curPoint = {
    x: e.clientX - editorRectInfo.left,
    y: e.clientY - editorRectInfo.top,
  };

  //组件中心点
  const centerPoint = {
    x: left! + width! / 2,
    y: top! + height! / 2,
  };

  //对称点
  const symmetricPoint = {
    x: centerPoint.x - (curPoint.x - centerPoint.x),
    y: centerPoint.y - (curPoint.y - centerPoint.y),
  };

  const style = {
    width,
    height,
    top,
    left,
    rotate,
  };

  const move = (e: MouseEvent) => {
    const curPosition = {
      x: e.clientX - editorRectInfo.left,
      y: e.clientY - editorRectInfo.top,
    };

    calculateComponentPositonAndSize(point, style, curPosition, 0, {
      curPoint,
      symmetricPoint,
      center: centerPoint,
    });

    store.setCurrentComponentStyle(style);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    store.recordSnapshot();
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const handleRatation = (e: MouseEvent) => {
  const startX = e.clientX;
  const startY = e.clientY;
  const { rotate } = currentComponent.value!.style;
  const rect = shapeRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const rotateDegreeBefore =
    Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

  const move = (e: MouseEvent) => {
    const curX = e.clientX;
    const curY = e.clientY;
    const rotateDegreeAfter =
      Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
    //@ts-ignore
    store.setCurrentComponentStyle({
      rotate: +rotate! + rotateDegreeAfter - rotateDegreeBefore,
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
.shape {
  position: absolute;

  .shape-point {
    height: 8px;
    width: 8px;
    transform: translate(-50%, -50%);
  }

  .rataion-point {
    left: 50%;
    transform: translate(-50%, -200%);
  }
}
</style>
