import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore } from "pinia";
import { reactive, ref, watch, type StyleValue } from "vue";
import { v4 as uuid } from "uuid";
import { swap } from "@/utils";
import { merge, cloneDeep } from "lodash-es";

export const useLowStore = defineStore("useLowStore", () => {
  const stack = reactive<LowCanvasData[][]>([]); //历史栈
  const index = ref<number>(0); //当前的State在历史栈中的位置
  const initState = {
    width: 1200,
    height: 720,
    scale: 1,
    background: "white",
    opacity: 1,
  }; //初始化State
  const localCanvasState: LowCanvasType = JSON.parse(
    localStorage.getItem("CanvasState") ?? JSON.stringify(initState)
  ); //获取localStorage中保存的State
  const lowCanvasState = ref<LowCanvasType>(localCanvasState); //当前的State
  const lowCanvasData = reactive<LowCanvasData[]>([]);
  const currentComponent = ref<LowCanvasData>();
  const currentComponentIndex = ref<number>();
  const idMapData = new Map<string, LowCanvasData>(); //id对应Data
  const idMapDataIndex = new Map<string, number>(); //id对应Data的Index
  stack.push([]);

  const initStack = () => {
    //初始化Stack
    if (stack.length == 0) return;
    stack.splice(0, stack.length, []);
    initLowCanvasState();
  };

  const initLowCanvasState = () => {
    //初始化LowCanvasState
    lowCanvasState.value = cloneDeep(initState);
  };

  const addLowCanvasData = (data: LowCanvasData) => {
    // 添加组件
    if (!data.id) {
      data.id = uuid();
    }
    lowCanvasData.push(data);
    idMapData.set(data.id as string, data);
    idMapDataIndex.set(data.id as string, lowCanvasData.length - 1);
    recordSnapshot(lowCanvasData);
  };

  const getCanvasDataById = (id: string) => {
    let index = idMapDataIndex.get(id);
    return lowCanvasData[index as number];
  };

  const setCurrentComponent = (id: string) => {
    //设置当前活动的组件
    let index = idMapDataIndex.get(id);
    currentComponentIndex.value = index;
    index != undefined && (currentComponent.value = lowCanvasData[index]);
  };

  const setCurrentComponentStyle = (style: StyleValue) => {
    //设置当前活动组建的style
    if (!currentComponent.value) return;
    currentComponent.value.style = merge(currentComponent.value.style, style);
  };

  const deleteComponentData = (id: string) => {
    //删除ComponentData
    const index = idMapDataIndex.get(id);
    console.log(index, id);
    if (index != undefined) {
      lowCanvasData.splice(index, 1);
      idMapData.delete(id);
      idMapDataIndex.delete(id);
      for (let i = index; i < lowCanvasData.length; i++) {
        let cur = lowCanvasData[i];
        idMapDataIndex.set(cur.id!, i);
      }
      if (currentComponent.value == lowCanvasData[index])
        currentComponent.value = undefined;
    }
  };

  const upLayerComponentData = (id: string) => {
    //层上移
    const index = idMapDataIndex.get(id);
    if (index != undefined && index < lowCanvasData.length - 1) {
      const [tmp] = swap(lowCanvasData, index, index + 1);
      idMapDataIndex.set(id, index + 1);
      tmp.id && idMapDataIndex.set(tmp.id, index);
      recordSnapshot();
    }
  };

  const downLayerComponentData = (id: string) => {
    //层下降
    const index = idMapDataIndex.get(id);
    if (index) {
      const [tmp] = swap(lowCanvasData, index, index - 1);
      idMapDataIndex.set(id, index - 1);
      tmp.id && idMapDataIndex.set(tmp.id, index);
      recordSnapshot();
    }
  };

  const setLowCanvasData = (data: LowCanvasData[]) => {
    //设置组件数组
    lowCanvasData.splice(0, lowCanvasData.length, ...data);
    idMapData.clear();
    idMapDataIndex.clear();
    lowCanvasData.forEach((item, i) => {
      item.id && idMapData.set(item.id, item);
      item.id && idMapDataIndex.set(item.id, i);
    });
  };

  const recordSnapshot = (state?: LowCanvasData[]) => {
    //添加快照
    stack[++index.value] =
      state != undefined ? cloneDeep(state) : cloneDeep(lowCanvasData);
    if (index.value < stack.length - 1) {
      stack.splice(index.value + 1, stack.length);
    }
  };

  const backSnapshot = () => {
    //后退
    if (stack.length < 0) return;
    index.value--;
    setLowCanvasData(cloneDeep(stack[index.value]) ?? []);
  };

  const forwardSnapshot = () => {
    //前进
    if (index.value >= stack.length - 1) return;
    index.value++;
    setLowCanvasData(cloneDeep(stack[index.value]) ?? []);
  };

  const init = () => {
    //初始化
    stack.splice(0, stack.length);
    index.value = -1;
    lowCanvasData.splice(0, lowCanvasData.length);
    currentComponent.value = undefined;
    currentComponentIndex.value = undefined;
    idMapData.clear();
    idMapDataIndex.clear();
  };

  const clearCanvas = () => {
    //清空画布
    lowCanvasData.splice(0, lowCanvasData.length);
    currentComponent.value = undefined;
    currentComponentIndex.value = undefined;
    idMapData.clear();
    idMapDataIndex.clear();
    recordSnapshot([]);
  };

  return {
    stack,
    stackIndex: index,
    lowCanvasState,
    lowCanvasData,
    backSnapshot,
    forwardSnapshot,
    initStack,
    initLowCanvasState,
    currentComponent,
    currentComponentIndex,
    addLowCanvasData,
    getCanvasDataById,
    setCurrentComponent,
    deleteComponentData,
    upLayerComponentData,
    downLayerComponentData,
    setCurrentComponentStyle,
    init,
    clearCanvas,
    recordSnapshot,
  };
});
