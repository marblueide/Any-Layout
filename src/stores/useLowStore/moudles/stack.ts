import { reactive, ref } from "vue";
import { useState } from "./state";
import type { snapShotType } from "../../../types/LowCode/stack";
import { snapShotEnum } from "../../../types/LowCode/stack";
import { swap } from "@/utils";

const {
  lowCanvasData,
  idMapData,
  idMapDataIndex,
  deleteComponentData,
  addLowCanvasDataByIndex,
  setComponentStyle,
  addLowCanvasData,
  setLowCanvasData,
  initLowCanvasData,
  initCurrentComponent,
} = useState();
const stack = reactive<snapShotType[]>([]); //历史栈
const index = ref<number>(-1); //当前的State在历史栈中的位置
export const useStack = () => {
  //初始化的操作
  const initStack = () => {
    //初始化Stack
    if (stack.length == 0) return;
    stack.splice(0, stack.length);
    index.value = -1;
  };

  const recordSnapshot = (data: snapShotType) => {
    stack[++index.value] = data;
    if (index.value < stack.length - 1) {
      stack.splice(index.value + 1, stack.length);
    }
  };

  const backSnapshot = () => {
    //后退
    if (stack.length < 0) return;
    const state = stack[index.value];
    handlerBack[state.type](state as any);
    index.value--;
  };

  const forwardSnapshot = () => {
    //前进
    if (index.value >= stack.length - 1) return;
    index.value++;
    const state = stack[index.value];
    handlerForward[state.type](state as any);
  };

  const handlerBack = {
    [snapShotEnum.clear](state: snapShotType<snapShotEnum.clear>) {
      setLowCanvasData(state.value);
    },
    [snapShotEnum.add](state: snapShotType<snapShotEnum.add>) {
      state.value.id && deleteComponentData(state.value.id);
    },
    [snapShotEnum.remove](state: snapShotType<snapShotEnum.remove>) {
      console.log(state.value.data);
      addLowCanvasDataByIndex(state.value.index, state.value.data);
    },
    [snapShotEnum.index](state: snapShotType<snapShotEnum.index>) {
      const [c1, c2] = swap(lowCanvasData, state.value[0], state.value[1]);
      idMapDataIndex.set(c1, state.value[0]);
      idMapDataIndex.set(c2, state.value[1]);
    },
    [snapShotEnum.style](state: snapShotType<snapShotEnum.style>) {
      setComponentStyle(state.value.id, state.value.data[0]);
    },
    [snapShotEnum.compose](state: snapShotType<snapShotEnum.compose>) {
      state.value.forEach((data) => {
        handlerBack[data.type](data as any);
      });
    },
  };

  const handlerForward = {
    [snapShotEnum.clear](state: snapShotType<snapShotEnum.clear>) {
      initLowCanvasData();
      initCurrentComponent();
      idMapData.clear();
      idMapDataIndex.clear();
    },
    [snapShotEnum.add](state: snapShotType<snapShotEnum.add>) {
      addLowCanvasData(state.value);
    },
    [snapShotEnum.remove](state: snapShotType<snapShotEnum.remove>) {
      deleteComponentData(state.value.data.id!);
    },
    [snapShotEnum.index](state: snapShotType<snapShotEnum.index>) {
      const [c1, c2] = swap(lowCanvasData, state.value[0], state.value[1]);
      idMapDataIndex.set(c1, state.value[0]);
      idMapDataIndex.set(c2, state.value[1]);
    },
    [snapShotEnum.style](state: snapShotType<snapShotEnum.style>) {
      setComponentStyle(state.value.id, state.value.data[1]);
    },
    [snapShotEnum.compose](state: snapShotType<snapShotEnum.compose>) {
      state.value.forEach((data) => {
        handlerForward[data.type](data as any);
      });
    },
  };

  return {
    stack,
    index,
    initStack,
    recordSnapshot,
    backSnapshot,
    forwardSnapshot,
  };
};
