import type { LowCanvasData } from "@/types/LowCode/index";
import { markRaw, type Component } from "vue";
import VButton from "./VButton/index.vue";
import VPicture from "./VPicture/index.vue";
import VText from "./VText/index.vue";
import VGroup from "./VGroup/index.vue";
import Echart from "./Echart/indedx.vue";
import VContainer from "./VContainer/index.vue";
import { LabelEnum } from "../../types/LowCode/index";
import { getAllCollapse } from "./attr-list";
import { EventTypeEnum } from "@/types/LowCode/event";
import { pick, omit } from "lodash-es";
import { LinePresets } from "./Echart/Presets/line";

export const componentList: [
  LowCanvasData<LabelEnum.button>,
  LowCanvasData<LabelEnum.picture>,
  LowCanvasData<LabelEnum.text>,
  LowCanvasData<LabelEnum.container>,
] = [
  {
    type: LabelEnum.button,
    label: LabelEnum.button,
    name: "button",
    collapse: [],
    events: {
      onClick: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
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
    type: LabelEnum.picture,
    label: LabelEnum.picture,
    name: "picture",
    collapse: [],
    events: {
      onClick: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 300,
      height: 200,
      rotate: 0,
      borderWidth: 2,
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
    type: LabelEnum.text,
    label: LabelEnum.text,
    name: "text",
    collapse: [],
    events: {},
    isLock: false,
    isRoot: true,
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
      textIndent:'0'
    },
    animations: [],
    icon: "icon-ziti",
    linkage: [],
    propValue: {
      value: "请输入",
    },
  },
  {
    type: LabelEnum.container,
    label: LabelEnum.container,
    name: "button",
    collapse: [],
    events: {
      
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 300,
      height: 200,
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
    icon: "icon-checkbox",
    linkage: [],
    propValue: {
      
    },
  }
];

// const temporarily = [
//   {
//     type: LabelEnum.echart,
//     label: LabelEnum.echart,
//     name: "button",
//     collapse: [],
//     events: {
//       onClick: {
//         type: EventTypeEnum.None,
//       },
//     },
//     isLock: false,
//     isRoot: true,
//     style: {
//       left: 0,
//       top: 0,
//       width: 300,
//       height: 200,
//       rotate: 0,
//       borderWidth: 0,
//       borderRadius: 0,
//       boxShadow: "none",
//     },
//     animations: [],
//     icon: "icon-anniu",
//     linkage: [],
//     propValue: {
//       echartOption: LinePresets[0].value,
//     },
//   },
// ];

export const labelEnumMapComponent: Record<LabelEnum, Component> = {
  [LabelEnum.button]: markRaw(VButton),
  [LabelEnum.picture]: markRaw(VPicture),
  [LabelEnum.text]: markRaw(VText),
  [LabelEnum.group]: markRaw(VGroup),
  [LabelEnum.container]:markRaw(VContainer)
};

export const labelEnumMapCGorup = omit(labelEnumMapComponent, [
  LabelEnum.group,
]);

const initComponentList = () => {
  componentList.forEach((item) => {
    item.collapse = getAllCollapse();
  });
};

initComponentList();
