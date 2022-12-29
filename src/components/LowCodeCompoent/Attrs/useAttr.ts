import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";
import { onActivated, onUnmounted, watch, type Ref } from "vue";
import type { LowCanvasData } from "../../../types/LowCode/index";

export const useAttr = () => {
  const store = useLowStore();
  let { currentComponent } = storeToRefs(store);
  const handleChange = (key: string, value: any) => {
    store.setCurrentComponentStyle({
      [key]: value,
    });
  };

  const unWatch = watch(
    () => store.currentComponent,
    (val) => {
      let { currentComponent: c } = storeToRefs(store);
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
