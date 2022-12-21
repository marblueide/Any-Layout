import type { AttrComponent, LowCanvasData } from "@/types/LowCode/index";
import { markRaw } from "vue";
import VButton from "./VButton/index.vue";
import VPicture from "./VPicture/index.vue";
import Border from "./Attrs/Border.vue";
import Shadow from "./Attrs/Shadow.vue";
import Arrangement from "./Attrs/Arrangement.vue";
import TextVerticalAlign from "./Attrs/TextVerticalAlign.vue";
import TextHorizontalAlign from "./Attrs/TextHorizontalAlign.vue";
import TextValue from "./Attrs/TextValue.vue";
import Background from "./Attrs/Background.vue";

export const baseAttr: AttrComponent = {
  border: () => markRaw(Border),
  shadow: () => markRaw(Shadow),
  arrangement: () => markRaw(Arrangement),
  textVerticalAlign: () => markRaw(TextVerticalAlign),
  textHorizontalAlign: () => markRaw(TextHorizontalAlign),
  textValue: () => markRaw(TextValue),
  background: () => markRaw(Background),
};

export const componentList: LowCanvasData[] = [
  {
    label: "按钮",
    component: () => markRaw(VButton),
    attr: [
      {
        name: "内容",
        data: [
          {
            name: "props",
            title: "属性",
            components: [baseAttr.textValue],
          },
        ],
        active: ["props"],
      },
      {
        name: "样式",
        data: [
          {
            name: "textAlign",
            title: "文字对齐",
            components: [
              baseAttr.textVerticalAlign,
              baseAttr.textHorizontalAlign,
            ],
          },
          {
            name: "background",
            title: "颜色",
            components: [baseAttr.background],
          },
          {
            name: "shadow",
            title: "阴影",
            components: [baseAttr.shadow],
          },
          {
            name: "border",
            title: "边框设置",
            components: [baseAttr.border],
          },
        ],
        active: ["textAlign", "background", "shadow", "border"],
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
      background: "#fff",
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
        data: [],
        active: [],
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
