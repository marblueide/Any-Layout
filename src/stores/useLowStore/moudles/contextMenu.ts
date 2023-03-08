import { MenuShowType, type LowCanvasData, type MenuState } from "@/types";
import { merge, cloneDeep, curry } from "lodash-es";
import { ref } from "vue";
import { v4 as uuid } from "uuid";
import {
  addLowCanvasData,
  deleteComponentData,
  idMapData,
  idMapDataIndex,
  lowCanvasData,
  setComponentLayer,
} from "./state";

const menuState = ref<MenuState>({
  type: MenuShowType.Editor,
  left: 0,
  top: 0,
  show: false,
});

const copyData = ref<LowCanvasData>();

const copy = (id: string) => {
  const component = idMapData.get(id);
  if (!component) return;
  copyData.value = component;
};

const paste = curry((isMenu: boolean) => {
  return () => {
    if (!copyData.value) return;
    const data = cloneDeep(copyData.value);
    data.id = uuid();
    if (isMenu) {
      data.style.left = menuState.value.left;
      data.style.top = menuState.value.top;
    } else {
      data.style.left += 20;
      data.style.top += 20;
    }
    addLowCanvasData(data);
  };
});

const shear = (id: string) => {
  const component = idMapData.get(id);
  if (!component) return;
  copyData.value = component;
  deleteComponentData(id);
};

const delet = (id:string) => {
  deleteComponentData(id);
};

const top = (id:string) => {
  const index = idMapDataIndex.get(id)
  index != undefined &&
    setComponentLayer(id, lowCanvasData.length - 1);
};

const bottom = (id:string) => {
  const index = idMapDataIndex.get(id)
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

export {
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
