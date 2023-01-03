import type { LowCanvasType, LowCanvasData } from "@/types";
import type { ComponentStyle } from "@/types/LowCode/style";
import { cloneDeep, merge } from "lodash-es";
import { ref, reactive } from "vue";
import { v4 as uuid } from "uuid";
const initState = {
  width: 1200,
  height: 720,
  scale: 1,
  background: "#fff",
  opacity: 1,
}; //初始化State
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
export const useState = () => {
  const initLowCanvasState = () => {
    //初始化LowCanvasState
    lowCanvasState.value = cloneDeep(initState);
  };

  const initLowCanvasData = () => {
    lowCanvasData.splice(0, lowCanvasData.length);
  };

  const setCurrentComponent = (id?: string) => {
    //设置当前活动的组件
    if (id == undefined) {
      currentComponentIndex.value = -1;
      currentComponent.value = undefined;
      return;
    }
    let index = idMapDataIndex.get(id);
    currentComponentIndex.value = index;
    currentComponent.value =
      index == undefined ? undefined : lowCanvasData[index];
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

  const setComponentStyle = (id: string, style: Partial<ComponentStyle>) => {
    const index = idMapDataIndex.get(id);
    index != undefined &&
      (lowCanvasData[index].style = merge(lowCanvasData[index].style, style));
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

  const addLowCanvasData = (data: LowCanvasData) => {
    // 添加组件
    if (!data.id) {
      data.id = uuid();
    }
    lowCanvasData.push(data);
    idMapData.set(data.id as string, data);
    idMapDataIndex.set(data.id as string, lowCanvasData.length - 1);
  };

  return {
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
  };
};