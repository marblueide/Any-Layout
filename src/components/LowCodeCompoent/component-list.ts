import type { LowCanvasData } from "@/types/LowCode/index";
import { markRaw } from "vue";
import VButton from "./VButton/index.vue";
import VPicture from "./VPicture/index.vue";
import VText from "./VText/index.vue";
import { LabelEnum } from "../../types/LowCode/index";

export const componentList: [
  LowCanvasData<LabelEnum.button>,
  LowCanvasData<LabelEnum.picture>,
  LowCanvasData<LabelEnum.text>
] = [
  {
    label: LabelEnum.button,
    name: "button",
    component: () => markRaw(VButton),
    attr: [["props"], ["font", "align", "background", "shadow", "border"]],
    events: {},
    isLock: false,
    style: {
      left: 0,
      top: 0,
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
    name: "picture",
    component: () => markRaw(VPicture),
    attr: [[], []],
    events: {},
    isLock: false,
    style: {
      left: 0,
      top: 0,
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
  {
    label: LabelEnum.text,
    name: "text",
    component: () => markRaw(VText),
    attr: [["props"], ["font"]],
    events: {},
    isLock: false,
    style: {
      left: 0,
      top: 0,
      width: 90,
      height: 45,
      rotate: 0,
      justifyContent: "center",
      alignItems: "center",
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
];
