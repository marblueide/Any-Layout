import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore } from "pinia";
import { swap } from "@/utils";
import * as modles from "./moudles";

import type { PropValue } from "../../types/LowCode/PropValue";
import { snapShotEnum } from "@/types/LowCode/stack";
import type { snapShotType } from "../../types/LowCode/stack";
import { cloneDeep } from "lodash-es";

const {
  initArea,
  initStack,
  recordSnapshot,
  lowCanvasData,
  currentComponent,
  currentComponentIndex,
  idMapData,
  idMapDataIndex,
  deleteComponentData,
  initLowCanvasData,
  addLowCanvasData,
  initCurrentComponent,
  ...exposeModles
} = modles;

//@ts-ignore
export const useLowStore = defineStore("useLowStore", () => {
  const init = () => {
    initLowCanvasData();
    initStack();
    initArea();
  };

  const clearCanvas = () => {
    //清空画布
    recordSnapshot({
      type: snapShotEnum.clear,
      value: cloneDeep(lowCanvasData),
    } as snapShotType<snapShotEnum.clear>);
    initLowCanvasData();
    initCurrentComponent();
    idMapData.clear();
    idMapDataIndex.clear();
  };

  const addLowCanvasDataAndSnapshot = (data: LowCanvasData) => {
    // 添加组件
    addLowCanvasData(data);
    recordSnapshot({
      type: snapShotEnum.add,
      value: data,
    } as snapShotType<snapShotEnum.add>);
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
      recordSnapshot({
        type: snapShotEnum.index,
        value: [index, index + 1],
      } as snapShotType<snapShotEnum.index>);
    }
  };

  const downLayerComponentData = (id: string) => {
    //层下降
    const index = idMapDataIndex.get(id);
    if (index) {
      const [tmp] = swap(lowCanvasData, index, index - 1);
      idMapDataIndex.set(id, index - 1);
      tmp.id && idMapDataIndex.set(tmp.id, index);
      recordSnapshot({
        type: snapShotEnum.index,
        value: [index, index - 1],
      } as snapShotType<snapShotEnum.index>);
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
    ...exposeModles,
    clearCanvas,
    addLowCanvasDataAndSnapshot,
    getCanvasDataById,
    upLayerComponentData,
    downLayerComponentData,
    splite,
    spliteSingle,
    initArea,
    initStack,
    recordSnapshot,
    lowCanvasData,
    currentComponent,
    currentComponentIndex,
    idMapData,
    idMapDataIndex,
    initLowCanvasData,
    addLowCanvasData,
    initCurrentComponent,
    deleteComponentData: (id: string) => {
      const { index, component } = deleteComponentData(id);
      recordSnapshot({
        type: snapShotEnum.remove,
        value: {
          index: index!,
          data: component!,
        },
      } as snapShotType<snapShotEnum.remove>);
    },
  };
});
