import type { LowCanvasData } from "@/types";
import { reactive, ref } from "vue";
import { merge, cloneDeep } from "lodash-es";
import { useState } from "./state";

const { lowCanvasData, setLowCanvasData } = useState();
const stack = reactive<LowCanvasData[][]>([]); //历史栈
const index = ref<number>(0); //当前的State在历史栈中的位置
export const useStack = () => {
  stack.push([]);

  //初始化的操作
  const initStack = () => {
    //初始化Stack
    if (stack.length == 0) return;
    stack.splice(0, stack.length, []);
    index.value = 0;
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

  return {
    stack,
    index,
    initStack,
    recordSnapshot,
    backSnapshot,
    forwardSnapshot,
  };
};
