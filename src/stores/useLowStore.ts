import type { LowCanvasData, LowCanvasType } from "@/types/LowCode";
import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import {v4 as uuid} from "uuid"

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
  const idMapData = new Map<string,LowCanvasData>()
  const zIndex = ref<number>(0);

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

  const addLowCanvasData = (data:LowCanvasData) => {
    if(!data.id){
      data.id = uuid()
    }
    lowCanvasState.value.data.push(data)
    idMapData.set(data.id as string,data)
  }

  const getCanvasDataById = (id:string) => {
    return idMapData.get(id)
  }

  const setCurrentComponent = (id:string) => {
    let current = idMapData.get(id)
    currentComponent.value = current as LowCanvasData
  }

  const setCurrentComponentPos = (left:number,top:number) => {
    //@ts-ignore
    currentComponent.value.style.left = left;
    //@ts-ignore
    currentComponent.value.style.top = top;
  }

  return {
    stack,
    lowCanvasState,
    lowStackBack,
    lowStackForward,
    initStack,
    initLowCanvasState,
    currentComponent,
    addLowCanvasData,
    getCanvasDataById,
    zIndex,
    setCurrentComponent,
    setCurrentComponentPos
  };
});
