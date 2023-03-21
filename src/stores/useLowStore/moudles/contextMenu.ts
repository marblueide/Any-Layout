import {
  MenuShowType,
  snapShotEnum,
  type LowCanvasData,
  type MenuState,
  type snapShotType,
} from "@/types";
import { merge, cloneDeep, curry } from "lodash-es";
import { ref, watch } from "vue";
import { v4 as uuid } from "uuid";
import { useLowCodeState } from "./state";
import { defineStore, storeToRefs } from "pinia";
import { useLowStore } from "..";
import { useArea } from "./area";

export const useContextMenu = defineStore("contextMenu", () => {
  const { idMapData, idMapDataIndex, lowCanvasData, getComponentById } =
    useLowCodeState();
  const { areaData } = storeToRefs(useArea());

  const {
    addLowCanvasDataAndSnapshot,
    deleteComponentDataAndSnapshot,
    setComponentLayer,
  } = useLowStore();

  const menuState = ref<MenuState>({
    type: MenuShowType.Editor,
    left: 0,
    top: 0,
    show: false,
  });

  const copyData = ref<LowCanvasData[]>([]);

  const copy = (...ids: string[]) => {
    const componets: LowCanvasData[] = [];
    for (let id of ids) {
      const component = getComponentById(id);
      console.log(component);
      if (!component) continue;
      componets.push(component);
    }
    copyData.value = componets;
  };

  const paste = curry((isMenu: boolean) => {
    return () => {
      if (!copyData.value) return;
      const datas = cloneDeep(copyData.value);
      for (let data of datas) {
        data.id = uuid();
        let left = data.style.left,
          top = data.style.top;
        if (isMenu) {
          if (datas.length > 1) {
            console.log(areaData.value,menuState.value)
            left += menuState.value.left - areaData.value.left;
            top += menuState.value.top - areaData.value.top;
          } else {
            left = menuState.value.left;
            top = menuState.value.top;
          }
        } else {
          left += 20;
          top += 20;
        }
        

        data.style.left = left;
        data.style.top = top;
        addLowCanvasDataAndSnapshot(data);
      }
    };
  });

  const shear = (...ids: string[]) => {
    const componets: LowCanvasData[] = [];
    for (let id of ids) {
      const component = idMapData.get(id);
      if (!component) return;
      componets.push(component);
      deleteComponentDataAndSnapshot(id);
    }
    copyData.value = componets;
  };

  const delet = (...ids: string[]) => {
    for(let id of ids){
      deleteComponentDataAndSnapshot(id);
    }
  };

  const top = (id: string) => {
    const index = idMapDataIndex.get(id);
    index != undefined && setComponentLayer(id, lowCanvasData.length - 1);
  };

  const bottom = (id: string) => {
    const index = idMapDataIndex.get(id);
    index != undefined && setComponentLayer(id, 0);
  };

  const up = (id: string) => {
    const component = idMapData.get(id);
    if (!component) return;
    const index = idMapDataIndex.get(component.id!);
    if (index != undefined && index < lowCanvasData.length - 1) {
      setComponentLayer(component.id!, index + 1);
    }
  };

  const down = (id: string) => {
    const component = idMapData.get(id);
    if (!component) return;
    const index = idMapDataIndex.get(component.id!);
    if (index != undefined && index > 0) {
      setComponentLayer(component.id!, index - 1);
    }
  };

  const setMenuState = (obj: Partial<MenuState>) => {
    menuState.value = merge(menuState.value, obj);
  };

  return {
    menuState,
    setMenuState,
    copy,
    paste,
    shear,
    delet,
    top,
    bottom,
    up,
    down,
  };
});
