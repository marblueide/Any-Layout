import type { LowCanvasData } from "@/types/LowCode/index";
import {
  markRaw,
  type Component,
  type ComputedOptions,
  type MethodOptions,
} from "vue";
import VButton from "./VButton/index.vue";
import VPicture from "./VPicture/index.vue";
import { LabelEnum } from "../../types/LowCode/index";

export const componentList: [
  LowCanvasData<LabelEnum.button>,
  LowCanvasData<LabelEnum.picture>
] = [
  {
    label: LabelEnum.button,
    component: () => markRaw(VButton),
    attr: [["props"], ["font", "align", "background", "shadow", "border"]],
    events: {},
    isLock: false,
    style: {
      width: 90,
      height: 45,
      rotate: 0,
      borderWidth: 2,
      borderRadius: 0,
      boxShadow: "none",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      color: "#000",
      fontSize: 16,
    },
    animations: [],
    icon: "icon-anniu",
    linkage: [],
    propValue: {
      value: "按钮",
    },
  },
  {
    label: LabelEnum.picture,
    component: () => markRaw(VPicture),
    attr: [[], []],
    events: {},
    isLock: false,
    style: {
      width: 300,
      height: 200,
      rotate: 0,
    },
    icon: "icon-tupian",
    animations: [],
    linkage: [],
    propValue: {
      src: new URL("@/assets/default.webp", import.meta.url).href,
      fit: "cover",
    },
  },
];
