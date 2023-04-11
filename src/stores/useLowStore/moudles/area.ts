import type { AreaData } from "@/types";
import { markRaw, ref } from "vue";
import { merge } from "lodash-es";
import { LabelEnum, type LowCanvasData } from "../../../types/LowCode/index";
import Group from "@/components/LowCodeCompoent/VGroup/index.vue";
import { useLowCodeState } from "./state";
import { useStack } from "./stack";
import { type snapShotType, snapShotEnum } from "@/types/LowCode/stack";
import { defineStore } from "pinia";

export const useArea = defineStore("area", () => {
  const {
    addLowCanvasData,
    deleteComponentData,
    idMapData,
    idMapDataIndex,
    lowCanvasData,
    setCurrentComponent,
    getComponentById,
  } = useLowCodeState();
  const { commitStorage, recordSnapshot } = useStack();
  const areaData = ref<AreaData>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    components: [],
  });
  const isShowArea = ref(false);
  const setAreaData = (obj: Partial<AreaData>) => {
    areaData.value = merge(areaData.value, obj);
  };
  const compose = () => {
    const data = areaData.value.components.map((id) => getComponentById(id));
    const components: LowCanvasData[] = [];
    data.forEach((component) => {
      if (component && component.label != LabelEnum.group) {
        const { left, top } = component.style;
        component.style.left -= areaData.value.left;
        component.style.top -= areaData.value.top;
        component.isRoot = false;
        recordSnapshot({
          type: snapShotEnum.style,
          value: {
            id: component.id,
            data: [
              { left, top },
              { left: component.style.left, top: component.style.top },
            ],
          },
        } as snapShotType<snapShotEnum.style>);
        components.push(component);
      }
    });

    const defaultGroup: LowCanvasData = {
      type: LabelEnum.group,
      label: LabelEnum.group,
      name: "group",
      icon: "",
      events: {},
      isLock: false,
      isRoot: true,
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
      collapse: [],
    };

    recordSnapshot({
      type: snapShotEnum.add,
      value: defaultGroup,
    });
    const component = addLowCanvasData(defaultGroup);

    data.forEach((component) => {
      if (component) {
        recordSnapshot({
          type: snapShotEnum.remove,
          value: {
            index: idMapDataIndex.get(component.id!),
            data: component,
          },
        } as snapShotType<snapShotEnum.remove>);
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

    //提交快照
    commitStorage();

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

  const hideArea = () => {
    if(!isShowArea.value) return
    isShowArea.value = false
  }

  const showArea = () => {
    if(isShowArea.value) return
    isShowArea.value = true
  }

  return {
    areaData,
    isShowArea,
    setAreaData,
    initArea,
    compose,
    setIsShowArea,
    hideArea,
    showArea
  };
});
