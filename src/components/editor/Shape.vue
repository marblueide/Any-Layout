<template>
  <div
    class="shape"
    ref="shapeRef"
    z-1
    :style="style"
    @mousedown.stop.prevent="handleMouseDown"
    :class="{
      'cursor-move outline-blue-3 outline-1  outline-solid':
        currentComponent?.id == id || isMoving,
      moving: currentComponent?.id == id && isMoving,
    }"
    @contextmenu.stop.prevent="handleContextMenu"
  >
    <div
      class="rataion-point"
      absolute
      @mousedown.stop.prevent="handleRatation"
      v-show="currentComponent?.id == id && !isPreView"
    >
      <i class="iconfont icon-xuanzhuan" color-blue-3 cursor-grab></i>
    </div>
    <template v-if="currentComponent?.id == id && !isPreView">
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
import { computed, ref, type StyleValue ,defineExpose} from "vue";
import { calculateComponentPositonAndSize } from "../../utils/calculateComponentPositonAndSize";
import emitter from "@/utils/mitt";
import { LabelEnum, type pointType } from "@/types";
import { MenuShowType, type LowCanvasData } from "../../types/LowCode/index";
import { cloneDeep } from "lodash-es";
import { snapShotEnum, type snapShotType } from "@/types/LowCode/stack";
import { appStore } from "@/stores";


const { currentComponent, isMoving, lowCanvasData, currentComponentIndex,isPreView } =
  storeToRefs(appStore.state);
const {
  setCurrentComponent,
  setMoving,
  setCurrentComponentStyle,
  setComponentStyle,
} = appStore.state;
const { recordSnapshot, commitStorage } = appStore.stack;
const { spliteSingle, getCanvasDataById } = appStore.lowStore;
const { setMenuState } = appStore.contextMenu;

const props = defineProps<{
  style: StyleValue;
  id: string;
}>();
const pointList: pointType[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
const shapeRef = ref();

const isGroupChidren = computed(() => {
  return (
    currentComponentIndex.value != undefined &&
    lowCanvasData.value[currentComponentIndex.value] != currentComponent.value
  );
});

const handleMouseDown = (e: MouseEvent) => {
  if(isPreView.value) return ;
  console.log(5555555555555)
  setCurrentComponent(props.id);
  console.log(currentComponent.value,props.id)
  const { left, top } = currentComponent.value!.style;
  const startX = e.clientX;
  const startY = e.clientY;

  setMoving(false);
  const move = async (e: MouseEvent) => {
    // console.log(e)
    !isMoving.value && setMoving(true);
    const endX = e.clientX;
    const endY = e.clientY;
    const curX = endX - startX + left;
    const curY = endY - startY + top;
    setCurrentComponentStyle({
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

    //收集快照
    isMoving.value &&
      recordSnapshot({
        type: snapShotEnum.style,
        value: {
          id: currentComponent.value!.id,
          data: [
            {
              left,
              top,
            },
            {
              left: currentComponent.value!.style.left,
              top: currentComponent.value!.style.top,
            },
          ],
        },
      } as snapShotType<snapShotEnum.style>);
    commitStorage();

    setMoving(false);
    emitter.emit("unMove");
    if (isGroupChidren.value) {
      const { left, top, width, height } =
        lowCanvasData.value[currentComponentIndex.value!].style;
      const right = left + width,
        bottom = top + height;
      const {
        left: curLeft,
        top: curTop,
        width: curWidth,
        height: curHeight,
      } = currentComponent.value!.style;
      const curRight = curLeft + curWidth,
        curBottom = curTop + curHeight;
      if (
        curLeft < -curWidth / 3 ||
        curTop < -curTop / 3 ||
        curRight > right + width / 3 ||
        curBottom > bottom + height / 3
      ) {
        currentComponent.value?.id && spliteSingle(currentComponent.value.id);
      }
    }
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const getPointStyle = (point: pointType): StyleValue => {
  const canvasData = getCanvasDataById(props.id);
  let hasT = point.includes("t");
  let hasB = point.includes("b");
  let hasL = point.includes("l");
  let hasR = point.includes("r");
  let left, top;

  if (point.length == 2) {
    left = hasL ? 0 : canvasData!.style.width;
    top = hasT ? 0 : canvasData!.style.height;
  } else {
    if (hasL || hasR) {
      left = hasL ? 0 : canvasData!.style.width;
      top = canvasData!.style.height! / 2;
    }
    if (hasT || hasB) {
      left = canvasData!.style.width! / 2;
      top = hasT ? 0 : canvasData!.style.height;
    }
  }

  return {
    left: left + "px",
    top: top + "px",
  };
};

const handlePointDown = (e: MouseEvent, point: pointType) => {
  setCurrentComponent(props.id);
  let { width, height, left, top, rotate } = currentComponent.value!.style;

  if (isGroupChidren.value) {
    const { left: l, top: t } =
      lowCanvasData.value[currentComponentIndex.value!].style;
    left += l;
    top += t;
  }

  setMoving(true);

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

  let chidrenCmp: LowCanvasData[] = [];

  if (currentComponent.value?.label == LabelEnum.group) {
    chidrenCmp = cloneDeep(currentComponent.value.propValue) as LowCanvasData[];
  }

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

    if (chidrenCmp.length > 0) {
      const x = style.width / width;
      const y = style.height / height;
      chidrenCmp.forEach((component) => {
        const { left, top, width, height } = component.style;
        component.id &&
          setComponentStyle(component.id, {
            left: left * x,
            width: width * x,
            top: top * y,
            height: height * y,
          });
      });
    }

    if (isGroupChidren.value) {
      const {
        left: l,
        top: t,
        height,
        width,
      } = lowCanvasData.value[currentComponentIndex.value!].style;
      style.left -= l;
      style.top -= t;
      if (style.top + style.height > height) {
        setComponentStyle(
          lowCanvasData.value[currentComponentIndex.value!].id!,
          {
            height: style.top + style.height,
          }
        );
      }

      if (style.left + style.width > width) {
        console.log(width);
        setComponentStyle(
          lowCanvasData.value[currentComponentIndex.value!].id!,
          {
            width: style.left + style.width,
          }
        );
      }
    }
    setCurrentComponentStyle(style);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);

    //收集快照
    recordSnapshot({
      type: snapShotEnum.style,
      value: {
        id: currentComponent.value!.id,
        data: [
          {
            width,
            height,
            top,
            left,
            rotate,
          },
          style,
        ],
      },
    } as snapShotType<snapShotEnum.style>);
    commitStorage();

    setMoving(false);
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

  let endRotate: number = rotate;

  const move = (e: MouseEvent) => {
    const curX = e.clientX;
    const curY = e.clientY;
    const rotateDegreeAfter =
      Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
    endRotate = rotate + rotateDegreeAfter - rotateDegreeBefore;
    setCurrentComponentStyle({
      rotate: endRotate,
    });
  };

  const up = () => {
    recordSnapshot({
      type: snapShotEnum.style,
      value: {
        id: currentComponent.value!.id,
        data: [
          {
            rotate,
          },
          {
            rotate: endRotate,
          },
        ],
      },
    } as snapShotType<snapShotEnum.style>);
    commitStorage();
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const handleContextMenu = (e: MouseEvent) => {
  if (!currentComponent.value || isPreView.value) return;
  let { left, top } = currentComponent.value.style;
  let type =
    currentComponent.value.type == LabelEnum.group
      ? MenuShowType.Group
      : MenuShowType.Component;
  let l = e.offsetX + left;
  let t = e.offsetY + top;
  if (isGroupChidren.value) {
    const father = lowCanvasData.value[currentComponentIndex.value!];
    l += father.style.left;
    t += father.style.top;
  }
  setMenuState({
    show: true,
    type,
    left: l,
    top: t,
  });
};

defineExpose({
  ref:shapeRef
})
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

  &.moving {
    opacity: 0.5;
    &::after {
      width: 100%;
      height: 100%;
    }
  }

  &::after {
    content: "";
    display: block;
    background: blue;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
