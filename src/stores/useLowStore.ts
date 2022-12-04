import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

export const useLowStore = defineStore("useLowStore", () => {
  const stack = reactive<LowCanvasType[]>([]);  //历史栈
  const index = ref<number>(0); //当前的State在历史栈中的位置
  const initState = {
    width: 1200,
    height: 720,
    scale: 1,
    background: "white",
    opacity: 1,
    data: [],
  };        //初始化State
  const localCanvasState: LowCanvasType = JSON.parse(
    localStorage.getItem("CanvasState") ?? JSON.stringify(initState)
  );    //获取localStorage中保存的State
  const lowCanvasState = ref<LowCanvasType>(localCanvasState);  //当前的State
  const currentComponent =  ref<LowCanvasData>()

  stack.push(lowCanvasState.value); //初始化历史栈

  watch(index,(val) => {
    if(stack.length == 0) return
    lowCanvasState.value = stack[val]
  })

  const lowStackBack = () => {
    //后退
    if (stack.length == 0) return;
    index.value = index.value - 1
  };

  const lowStackForward = () => {
    //前进
    if(index.value >= stack.length - 1) return;
    index.value = index.value + 1
  }

  const initStack = () => {
    //初始化Stack
    if(stack.length == 0) return
    stack.splice(0,stack.length)
    initLowCanvasState()
    stack.push(lowCanvasState.value)
  }

  const initLowCanvasState = () => {
    //初始化LowCanvasState
    lowCanvasState.value = initState
  }


  return {
    stack,
    lowCanvasState,
    lowStackBack,
    lowStackForward,
    initStack,
    initLowCanvasState,
    currentComponent
  };
});
