import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore, storeToRefs } from "pinia";
import { useArea, useContextMenu, useLowCodeState, useStack } from "./moudles";
import { snapShotEnum } from "@/types/LowCode/stack";
import { cloneDeep } from "lodash-es";

export const useLowStore = defineStore("useLowStore", () => {
  const { initArea } = useArea();

  const { initStack, recordSnapshot, commitStorage } = useStack();

  const state = useLowCodeState();
  const {
    lowCanvasData,
    idMapData,
    idMapDataIndex,
    deleteComponentData,
    initLowCanvasData,
    addLowCanvasData,
    initCurrentComponent,
  } = state;

  const { currentComponent, currentComponentIndex } = storeToRefs(state);

  const init = () => {
    initLowCanvasData();
    initStack();
    initArea();
  };

  const clearCanvas = () => {
    //清空画布

    //快照
    recordSnapshot({
      type: snapShotEnum.clear,
      value: cloneDeep(lowCanvasData),
    });
    commitStorage();

    //初始化操作
    initLowCanvasData();
    initCurrentComponent();
    idMapData.clear();
    idMapDataIndex.clear();
  };

  const getCanvasDataById = (id: string) => {
    return idMapData.get(id);
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
    init,
    clearCanvas,
    getCanvasDataById,
    splite,
    spliteSingle,
  };
});
