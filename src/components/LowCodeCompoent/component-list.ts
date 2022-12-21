import type { AttrComponent, LowCanvasData } from "@/types/LowCode/index";
import { markRaw } from "vue";
import VButton from "./VButton/index.vue";
import VPicture from "./VPicture/index.vue";
import Border from "./Attrs/Border.vue";
import Shadow from "./Attrs/Shadow.vue";
import Arrangement from "./Attrs/Arrangement.vue";
import TextAlign from "./Attrs/TextAlign.vue";

export const baseAttr: {
  [k in string]: AttrComponent;
} = {
  border: {
    name: "border",
    title: "边框",
    component: () => markRaw(Border),
  },
  shadow: {
    name: "shadow",
    title: "阴影",
    component: () => markRaw(Shadow),
  },
  arrangement: {
    name: "arrangement",
    title: "排列方式",
    component: () => markRaw(Arrangement),
  },
  textAlign: {
    name: "textAlign",
    title: "文字对齐",
    component: () => markRaw(TextAlign),
  },
};

export const componentList: LowCanvasData[] = [
  {
    label: "按钮",
    component: () => markRaw(VButton),
    attr: [
      {
        name: "内容",
        data: ["textAlign"],
        active: ["textAlign"],
      },
      {
        name: "样式",
        data: ["border", "shadow"],
        active: ["border", "shadow"],
      },
    ],
    events: {},
    isLock: false,
    style: {
      width: 90,
      height: 45,
      rotate: "0",
      borderWidth: 2,
      borderRadius: 0,
      boxShadow: "none",
      justifyContent: "center",
      alignItems: "center",
    },
    animations: [],
    icon: "icon-anniu",
    linkage: [],
    propValue: {
      value: "按钮",
    },
  },
  {
    label: "图片",
    component: () => markRaw(VPicture),
    attr: [
      {
        name: "内容",
        data: [],
        active: [],
      },
      {
        name: "样式",
        data: ["border"],
        active: ["border"],
      },
    ],
    events: {},
    isLock: false,
    style: {
      width: 300,
      height: 200,
      rotate: "0",
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
