import type { LowCanvasType, LowCanvasData } from "@/types";
import type { ComponentStyle } from "@/types/LowCode/style";
import { cloneDeep, isArray, merge } from "lodash-es";
import { ref, reactive,isReactive } from "vue";
import { v4 as uuid } from "uuid";
import type { EventType } from "../../../types/LowCode/event";
import { useStack } from "./stack";
import { defineStore } from "pinia";

const initState = {
  height: window.innerHeight,
  scale: 1,
  background: "#f5f5f5",
  opacity: 1,
}; //初始化State

console.log(window.innerHeight)

export const useLowCodeState = defineStore("lowCodeState", () => {
  const localCanvasState: LowCanvasType = JSON.parse(
    localStorage.getItem("CanvasState") ?? JSON.stringify(initState)
  ); //获取localStorage中保存的State
  const localCanvasData: LowCanvasData[] = JSON.parse(
    localStorage.getItem("CanvasData") ?? JSON.stringify([])
  );
  const lowCanvasState = ref<LowCanvasType>(localCanvasState); //当前的State
  const lowCanvasData = reactive<LowCanvasData[]>(localCanvasData);
  const currentComponent = ref<LowCanvasData>();
  const currentComponentIndex = ref<number>();
  const idMapData = new Map<string, LowCanvasData>(); //id对应Data
  const idMapDataIndex = new Map<string, number>(); //id对应Data的Index
  const isMoving = ref(false);//是否移动
  const isPreView = ref(false); //预览

  localInit()
  function localInit(){
    //初始化
    lowCanvasData.forEach((item,index) => {
      idMapData.set(item.id!,item)
      idMapDataIndex.set(item.id!,index)
    })
  }

  const triggerPreView = () => {
    isPreView.value = !isPreView.value
  }

  

  const initLowCanvasData = () => {
    lowCanvasData.splice(0, lowCanvasData.length);
  };

  const initCurrentComponent = () => {
    currentComponent.value = undefined;
    currentComponentIndex.value = undefined;
  };

  const setComponent = (id:string,data:LowCanvasData) => {
    //合并component
    let component = idMapData.get(id);
    component && Object.assign(component,data)
  }

  const setCanvasState = (data:LowCanvasType) => {
    //合并CanvasState
    Object.assign(lowCanvasState.value,data)
  }

  const setCurrentComponent = (id?: string) => {
    //设置当前活动的组件
    if (id == undefined) {
      currentComponentIndex.value = -1;
      currentComponent.value = undefined;
      return;
    }
    const component = idMapData.get(id);
    const index = idMapDataIndex.get(id);
    currentComponentIndex.value = index;
    currentComponent.value = component;
  };

  const setCUrrentCompoentEvent = (obj: EventType,isMerge:boolean = true) => {
    if (!currentComponent.value) return;
    currentComponent.value.events = isMerge ? merge(currentComponent.value.events,obj) : obj
  };

  const setCurrentComponentStyle = (style: Partial<ComponentStyle>) => {
    //设置当前活动组建的style
    if (!currentComponent.value) return;
    currentComponent.value.style = merge(currentComponent.value.style, style);
  };

  const setCurrentProps = (obj: any) => {
    if (!currentComponent.value) return;
    currentComponent.value.propValue = merge(
      currentComponent.value.propValue,
      obj
    );
  };

  const setCurrentState = <K extends keyof LowCanvasData = keyof LowCanvasData>(
    key: K,
    value: LowCanvasData[K]
  ) => {
    currentComponent.value && (currentComponent.value[key] = value);
  };

  const setComponentStyle = (id: string, style: Partial<ComponentStyle>) => {
    const component = idMapData.get(id);
    component && (component.style = merge(component?.style, style));
  };

  const setLowCanvasState = (obj: Partial<LowCanvasType>) => {
    lowCanvasState.value = merge(lowCanvasState.value, obj);
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

  const deleteComponentData = (id: string) => {
    //删除ComponentData
    const index = idMapDataIndex.get(id);
    const component = idMapData.get(id);
    if (index != undefined) {
      if (currentComponent.value == component)
        currentComponent.value = undefined;
      lowCanvasData.splice(index, 1);
      idMapData.delete(id);
      idMapDataIndex.delete(id);
      for (let i = index; i < lowCanvasData.length; i++) {
        let cur = lowCanvasData[i];
        idMapDataIndex.set(cur.id!, i);
      }
    }
    return {
      index,
      component,
    };
  };

  const addLowCanvasData = (data: LowCanvasData) => {
    // 添加组件
    if (!data.id) {
      data.id = uuid();
    }
    lowCanvasData.push(data);
    idMapData.set(data.id, lowCanvasData[lowCanvasData.length - 1]);
    idMapDataIndex.set(data.id, lowCanvasData.length - 1);
    return lowCanvasData[lowCanvasData.length - 1];
  };

  const addLowCanvasDataByIndex = (index: number, data: LowCanvasData) => {
    lowCanvasData.splice(index, 0, data);
    for (let i = index; i < lowCanvasData.length; i++) {
      idMapData.set(lowCanvasData[i].id!, lowCanvasData[i]);
      idMapDataIndex.set(lowCanvasData[i].id!, i);
    }
  };

  const setMoving = (value: boolean) => {
    isMoving.value = value;
  };

  const getComponentById = (id: string) => {
    return idMapData.get(id);
  };

  const save = () => {
    localStorage.setItem("CanvasState", JSON.stringify(lowCanvasState.value));
    localStorage.setItem("CanvasData", JSON.stringify(lowCanvasData));
    console.log(JSON.stringify(lowCanvasData))
  }

  return {
    lowCanvasState,
    lowCanvasData,
    currentComponent,
    currentComponentIndex,
    idMapData,
    idMapDataIndex,
    isMoving,
    isPreView,
    setMoving,
    setCurrentComponent,
    setCurrentComponentStyle,
    setCurrentProps,
    setCurrentState,
    setComponentStyle,
    setLowCanvasState,
    setLowCanvasData,
    setCUrrentCompoentEvent,
    deleteComponentData,
    addLowCanvasData,
    addLowCanvasDataByIndex,
    getComponentById,
    initCurrentComponent,
    initLowCanvasData,
    setComponent,
    setCanvasState,
    save,
    triggerPreView,
  };
});
