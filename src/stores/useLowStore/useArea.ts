import type { AreaData } from "@/types";
import { markRaw, ref } from "vue";
import { cloneDeep, merge } from "lodash-es";
import { LabelEnum, type LowCanvasData } from "../../types/LowCode/index";
import Group from "@/components/LowCodeCompoent/VGroup/index.vue";

export const useArea = () => {
  const areaData = ref<AreaData>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    components: [],
  });

  const setAreaData = (obj: Partial<AreaData>) => {
    areaData.value = merge(areaData.value, obj);
  };
  const compose = () => {
    const components: LowCanvasData[] = [];
    areaData.value.components.forEach((component) => {
      if (component.label != LabelEnum.group) {
        components.push(cloneDeep(component));
      }
    });

    const defaultGroup: LowCanvasData = {
      label: LabelEnum.group,
      component: () => markRaw(Group),
      attr: [[], []],
      icon: "",
      events: {},
      isLock: false,
      style: {},
      propValue: components,
      animations: [],
      linkage: [],
    };
  };
  return {
    areaData,
    setAreaData,
  };
};
