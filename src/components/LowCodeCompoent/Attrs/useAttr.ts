import { appStore } from "@/stores";
import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";
import { onActivated, onUnmounted, watch, type Ref } from "vue";
import type { LowCanvasData } from "../../../types/LowCode/index";

export const useAttr = () => {
  const store = useLowStore();
  let { currentComponent } = storeToRefs(appStore.state);
  const {setCurrentComponentStyle} = appStore.state
  const handleChange = (key: string, value: any) => {
    setCurrentComponentStyle({
      [key]: value,
    });
  };

  const unWatch = watch(
    () => currentComponent,
    (val) => {
      let { currentComponent: c } = storeToRefs(appStore.state);
      currentComponent = c;
    }
  );

  onUnmounted(() => {
    unWatch();
  });

  return {
    currentComponent,
    handleChange,
  };
};
