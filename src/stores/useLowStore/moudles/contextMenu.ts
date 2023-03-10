import {
  MenuShowType,
  snapShotEnum,
  type LowCanvasData,
  type MenuState,
  type snapShotType,
} from "@/types";
import { merge, cloneDeep, curry } from "lodash-es";
import { ref } from "vue";
import { v4 as uuid } from "uuid";
import { useLowCodeState } from "./state";
import { defineStore } from "pinia";

export const useContextMenu = defineStore("contextMenu", () => {
  const {
    addLowCanvasDataAndSnapshot,
    deleteComponentDataAndSnapshot,
    idMapData,
    idMapDataIndex,
    lowCanvasData,
    setComponentLayer,
  } = useLowCodeState();

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
      const component = idMapData.get(id);
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
        if (isMenu) {
          data.style.left = menuState.value.left;
          data.style.top = menuState.value.top;
        } else {
          data.style.left += 20;
          data.style.top += 20;
        }
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

  const delet = (id: string) => {
    deleteComponentDataAndSnapshot(id);
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
