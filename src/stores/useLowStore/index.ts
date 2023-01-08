import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore } from "pinia";
import { swap } from "@/utils";
import { useArea, useStack, useState } from "./moudles";
import type { PropValue } from "../../types/LowCode/PropValue";

//@ts-ignore
export const useLowStore = defineStore("useLowStore", () => {
  const {
    areaData,
    isShowArea,
    setAreaData,
    initArea,
    setIsShowArea,
    compose,
  } = useArea();

  let {
    lowCanvasState,
    lowCanvasData,
    currentComponent,
    currentComponentIndex,
    idMapData,
    idMapDataIndex,
    isMoving,
    setMoving,
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

  const init = () => {
    initLowCanvasData();
    initStack();
    initArea();
  };

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
    return idMapData.get(id);
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

  const splite = () => {
    if (Array.isArray(currentComponent.value?.propValue)) {
      currentComponent.value?.propValue.forEach((component: LowCanvasData) => {
        component.style.left! += currentComponent.value?.style.left!;
        component.style.top! += currentComponent.value?.style.top!;
        addLowCanvasData(component);
        component.id &&
          idMapDataIndex.set(component.id, lowCanvasData.length - 1);
        component.id &&
          idMapData.set(component.id, lowCanvasData[lowCanvasData.length - 1]);
      });
      currentComponent.value?.id &&
        deleteComponentData(currentComponent.value?.id);
    }
  };

  const spliteSingle = (id: string) => {
    const father = lowCanvasData[currentComponentIndex.value!];
    if (Array.isArray(father.propValue)) {
      const index = father.propValue.findIndex(
        (component) => component.id == id
      );
      const component = idMapData.get(id);
      component!.style.left += father.style.left;
      component!.style.top += father.style.top;
      addLowCanvasData(component!);
      index != undefined && index != -1 && father.propValue.splice(index, 1);
      if (father.propValue.length == 0) {
        deleteComponentData(father.id!);
      }
    }
  };

  return {
    stack,
    stackIndex: index,
    lowCanvasState,
    lowCanvasData,
    areaData,
    isShowArea,
    currentComponent,
    currentComponentIndex,
    isMoving,
    setMoving,
    backSnapshot,
    forwardSnapshot,
    initStack,
    initLowCanvasState,
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
    init,
    setIsShowArea,
    compose,
    splite,
    spliteSingle,
  };
});
