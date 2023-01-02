import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { v4 as uuid } from "uuid";
import { swap } from "@/utils";
import { useArea } from "./useArea";
import { useStack } from "./useStack";
import { useState } from "./useState";

//@ts-ignore
export const useLowStore = defineStore("useLowStore", () => {
  const { areaData, setAreaData } = useArea();

  let {
    lowCanvasState,
    lowCanvasData,
    currentComponent,
    currentComponentIndex,
    idMapData,
    idMapDataIndex,
    setCurrentComponent,
    setCurrentComponentStyle,
    setCurrentProps,
    setComponentStyle,
    setLowCanvasState,
    setLowCanvasData,
    deleteComponentData,
    initLowCanvasState,
    initLowCanvasData,
    addLowCanvasData,
  } = useState();

  const {
    stack,
    index,
    initStack,
    recordSnapshot,
    backSnapshot,
    forwardSnapshot,
  } = useStack();

  const clearCanvas = () => {
    //清空画布
    initLowCanvasData();
    currentComponent.value = undefined;
    currentComponentIndex.value = undefined;
    idMapData.clear();
    idMapDataIndex.clear();
    recordSnapshot([]);
  };

  const addLowCanvasDataAndSnapshot = (data: LowCanvasData) => {
    // 添加组件
    addLowCanvasData(data);
    recordSnapshot(lowCanvasData);
  };

  const getCanvasDataById = (id: string) => {
    let index = idMapDataIndex.get(id);
    return lowCanvasData[index as number];
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

  return {
    stack,
    stackIndex: index,
    lowCanvasState,
    lowCanvasData,
    areaData,
    backSnapshot,
    forwardSnapshot,
    initStack,
    initLowCanvasState,
    currentComponent,
    currentComponentIndex,
    addLowCanvasData: addLowCanvasDataAndSnapshot,
    getCanvasDataById,
    setCurrentComponent,
    setComponentStyle,
    setCurrentProps,
    setLowCanvasData,
    setAreaData,
    deleteComponentData,
    upLayerComponentData,
    downLayerComponentData,
    setCurrentComponentStyle,
    clearCanvas,
    recordSnapshot,
    setLowCanvasState,
  };
});
