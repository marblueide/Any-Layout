import type { AreaData } from "@/types";
import { markRaw, ref } from "vue";
import { cloneDeep, merge } from "lodash-es";
import { LabelEnum, type LowCanvasData } from "../../../types/LowCode/index";
import Group from "@/components/LowCodeCompoent/VGroup/index.vue";
import { useState } from "./state";

const {
  addLowCanvasData,
  deleteComponentData,
  idMapData,
  idMapDataIndex,
  lowCanvasData,
  setCurrentComponent,
  currentComponent,
  getComponentById,
} = useState();
const areaData = ref<AreaData>({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  components: [],
});
const isShowArea = ref(false);
export const useArea = () => {
  const setAreaData = (obj: Partial<AreaData>) => {
    areaData.value = merge(areaData.value, obj);
  };
  const compose = () => {
    const data = areaData.value.components.map((id) => getComponentById(id));
    const components: LowCanvasData[] = [];
    data.forEach((component) => {
      if (component && component.label != LabelEnum.group) {
        component.style.left && (component.style.left -= areaData.value.left);
        component.style.top && (component.style.top -= areaData.value.top);
        components.push(component);
      }
    });

    const defaultGroup: LowCanvasData = {
      label: LabelEnum.group,
      name: "group",
      component: () => markRaw(Group),
      attr: [[], []],
      icon: "",
      events: {},
      isLock: false,
      style: {
        left: areaData.value.left,
        top: areaData.value.top,
        width: areaData.value.width,
        height: areaData.value.height,
        rotate: 0,
      },
      propValue: components,
      animations: [],
      linkage: [],
    };
    const component = addLowCanvasData(defaultGroup);

    data.forEach((component) => {
      if (component) {
        component.id && deleteComponentData(component.id);
      }
    });

    data.forEach((component) => {
      if (component) {
        component.id && idMapData.set(component.id, component);
        component.id &&
          idMapDataIndex.set(component.id, lowCanvasData.length - 1);
      }
    });

    areaData.value.components = [];
    isShowArea.value = false;
    setCurrentComponent(component.id);
  };

  const initArea = () => {
    areaData.value = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      components: [],
    };
    setIsShowArea(false);
  };

  const setIsShowArea = (value: boolean) => {
    isShowArea.value = value;
  };
  return {
    areaData,
    isShowArea,
    setAreaData,
    initArea,
    compose,
    setIsShowArea,
  };
};
