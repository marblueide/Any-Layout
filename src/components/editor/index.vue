<template>
  <div class="center" flex-1 p-5 overflow="hidden" ref="centerRef">
    <el-scrollbar>
      <div class="edit-container">
        <div
          id="editor"
          class="editor"
          ref="editorRef"
          overflow="hidden"
          :style="editorStyle"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown.prevent="handleMouseDown"
          @contextmenu.stop.prevent="handleContextMenu"
        >
          <!-- <Grid :width="lowCanvasState.width" :height="lowCanvasState.height" /> -->
          <Shape
            v-for="item in lowCanvasData"
            :id="item.id!"
            :key="item.id!"
            :style="getShapeStyle(item.style)"
          >
            <component
              :is="labelEnumMapComponent[item.type]"
              :propValue="item.propValue"
              :style="getOriginStyle(item.style)"
            >
            </component>
          </Shape>
          <Area
            v-bind="{ ...areaData }"
            v-show="isShowArea"
            @mousedown.stop.prevent="handleAreaDwon"
            @contextMenu="handleAreaContextMenu"
          />
          <MarkLine />
          <ContextMenu />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref, reactive, nextTick, onMounted } from "vue";
import {
  getShapeStyle,
  getOriginStyle,
  getComponentRotatedStyle,
} from "../../utils/style";
import { componentList, labelEnumMapComponent } from "@/components/LowCodeCompoent/component-list";
import { cloneDeep, entries } from "lodash-es";
import { MenuShowType, type LowCanvasData } from "../../types/LowCode/index";
import type { ComponentStyle } from "@/types/LowCode/style";
import ContextMenu from "./ContextMenu.vue";
import { appStore } from "@/stores";

const { lowCanvasState, lowCanvasData } = storeToRefs(appStore.state);
const { areaData, isShowArea } = storeToRefs(appStore.area);
const { menuState } = storeToRefs(appStore.contextMenu);
const { setCurrentComponent, getComponentById, setComponentStyle } =
  appStore.state;
const { setIsShowArea, setAreaData, hideArea, showArea } = appStore.area;
const { setMenuState } = appStore.contextMenu;
const { addLowCanvasDataAndSnapshot } = appStore.lowStore;

const editorRef = ref();
const centerRef = ref()
let editorRect: DOMRect;
let centerRect: DOMRect

const editorStyle = computed(() => {
  return {
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
  if(!editorRect) editorRect = editorRef.value.getBoundingClientRect();
  const { width, height } = data.style;
  let left = e.clientX - editorRect.x - width / 2;
  let top = e.clientY - editorRect.y - height! / 2;
  left =
    left < 0
      ? 0
      : left >= editorRect.width - width!
      ? editorRect.width - width!
      : left;
  top =
    top < 0
      ? 0
      : top >= lowCanvasState.value.height - height!
      ? lowCanvasState.value.height - height!
      : top;
  data.style.left = left;
  data.style.top = top;
  addLowCanvasDataAndSnapshot(data);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const selectComponentSet = reactive<Set<string>>(new Set());

const handleMouseDown = async (e: MouseEvent) => {
  e.preventDefault();
  if (!editorRect) editorRect = editorRef.value.getBoundingClientRect();
  if(!centerRect) centerRect = centerRef.value.getBoundingClientRect()
  console.log(centerRect)
  const startX = e.clientX;
  const startY = e.clientY;

  //设置当前的组件为undefine
  setCurrentComponent();
  //area不显示
  hideArea();
  //清空area选择的状态，开始新的一轮
  selectComponentSet.clear();
  //初始化area
  setAreaData({
    width: 0,
    top: 0,
    components: [],
  });
  //记录area的left，top
  const data = {
    left: startX - editorRect.left,
    top: startY - editorRect.top,
  };
  let once = true;

  const move = (e: MouseEvent) => {
    if (once) {
      once = false;
      setAreaData(data);
      showArea();
    }
    const endX = e.clientX;
    const endY = e.clientY;
    const width = endX - startX;
    const height = endY - startY;
    const left = width > 0 ? data.left : endX - editorRect.left;
    const top = height > 0 ? data.top : endY - editorRect.top;
    setAreaData({
      width: width > 0 ? width : -width,
      height: height > 0 ? height : -height,
      left,
      top,
    });
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);

    /**
     * 计算area选中了哪些组件
     */
    let l = Infinity,
      t = Infinity,
      r = -Infinity,
      b = -Infinity;
    lowCanvasData.value.forEach((item) => {
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
      setAreaData({
        left: l,
        top: t,
        width: r - l,
        height: b - t,
        components: [...selectComponentSet],
      });
    }
    setIsShowArea(selectComponentSet.size > 1);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);

  await nextTick();
  menuState.value.show &&
    setMenuState({
      show: false,
    });
};

const handleAreaDwon = (e: MouseEvent) => {
  const { left, top } = areaData.value;
  const startX = e.clientX;
  const startY = e.clientY;
  const componetPos: ComponentStyle[] = [];
  const data: LowCanvasData[] = [];
  selectComponentSet.forEach((id) => {
    data.push(getComponentById(id)!);
  });

  data.forEach((item) => {
    componetPos.push(cloneDeep(item.style));
  });

  const move = (e: MouseEvent) => {
    const endX = e.clientX;
    const endY = e.clientY;
    const disX = endX - startX;
    const disY = endY - startY;

    setAreaData({
      left: left + disX,
      top: top + disY,
    });

    let index = 0;
    data.forEach((item) => {
      const { left, top } = componetPos[index++];
      item &&
        setComponentStyle(item.id!, {
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

const handleContextMenu = (e: MouseEvent) => {
  let left = e.offsetX,
    top = e.offsetY,
    type = MenuShowType.Editor;
  setMenuState({
    show: true,
    type,
    left,
    top,
  });
};

const handleAreaContextMenu = (e: MouseEvent) => {
  let left = e.offsetX + areaData.value.left,
    top = e.offsetY + areaData.value.top;
  setMenuState({
    show: true,
    type: MenuShowType.Area,
    left,
    top,
  });
};

const handleShapeDrag = () => {
  //处理
}

window.addEventListener('resize',() => {
  editorRect = editorRef.value.getBoundingClientRect();
  centerRect = centerRef.value.getBoundingClientRect();
})
</script>

<style scoped lang="scss">
.center {
  background: #fff;

  .edit-container {
    width: 100%;
    height: 100%;
    .editor {
      position: relative;
      background: #f5f5f5;
    }
  }
}
</style>
