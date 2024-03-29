import type { LowCanvasData } from "@/types/LowCode/index";
import { markRaw, type Component } from "vue";
import VButton from "./VButton/index.vue";
import VPicture from "./VPicture/index.vue";
import VText from "./VText/index.vue";
import VGroup from "./VGroup/index.vue";
import Echart from "./Echart/indedx.vue";
import VInput from "./VInput/index.vue";
import VContainer from "./VContainer/index.vue";
import VSelect from "./VSelect/index.vue";
import VSwitch from "./VSwitch/index.vue";
import VPagination from "./VPagination/index.vue";
import VProcess from "./VProcess/index.vue";
import VCheckGroup from "./VCheckGroup/index.vue";
import VRadio from "./VRadio/index.vue";
import { LabelEnum } from "../../types/LowCode/index";
import { getAllCollapse } from "./attr-list";
import { EventTypeEnum } from "@/types/LowCode/event";
import { pick, omit } from "lodash-es";
import { presetsMap } from "./Echart/Presets";

export const componentList: [
  LowCanvasData<LabelEnum.button>,
  LowCanvasData<LabelEnum.picture>,
  LowCanvasData<LabelEnum.text>,
  LowCanvasData<LabelEnum.container>,
  LowCanvasData<LabelEnum.input>,
  LowCanvasData<LabelEnum.echart>,
  LowCanvasData<LabelEnum.select>,
  LowCanvasData<LabelEnum.switch>,
  LowCanvasData<LabelEnum.pagination>,
  LowCanvasData<LabelEnum.progress>,
  LowCanvasData<LabelEnum.checkbox>,
  LowCanvasData<LabelEnum.radio>
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
      styleBox: true,
      padding: "1px 2px 3px 4px",
      margin: "0 0 0 0",
      borderColor: "#fff",
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
      boxShadow: "none",
      borderRadius: 0,
      padding: "0 0 0 0",
      margin: "0 0 0 0",
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
      justifyContent: "start",
      alignItems: "start",
      color: "#000",
      fontSize: 16,
      textIndent: "0",
      padding: "0 0 0 0",
      margin: "0 0 0 0",
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
    name: "container",
    collapse: [],
    events: {},
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
      padding: "0 0 0 0",
      margin: "0 0 0 0",
    },
    animations: [],
    icon: "icon-checkbox",
    linkage: [],
    propValue: {
      shadow: "always ",
    },
  },
  {
    type: LabelEnum.input,
    label: LabelEnum.input,
    name: "input",
    collapse: [],
    events: {
      onInput: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 200,
      height: 50,
      rotate: 0,
      color: "#000",
      fontSize: 16,
      borderWidth: 0,
      borderRadius: 0,
      padding: "0 0 0 0",
      margin: "0 0 0 0",
    },
    animations: [],
    icon: "icon-danhangshurukuang",
    linkage: [],
    propValue: {
      type: "text",
      placeholder: "请输入值",
      value: "",
    },
  },
  {
    type: LabelEnum.echart,
    label: LabelEnum.echart,
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
      width: 300,
      height: 200,
      rotate: 0,
      borderWidth: 0,
      borderRadius: 0,
      boxShadow: "none",
    },
    animations: [],
    icon: "icon-anniu",
    linkage: [],
    propValue: {
      echartOption: presetsMap["基本柱状图"],
    },
  },
  {
    type: LabelEnum.select,
    label: LabelEnum.select,
    name: "select",
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
      width: 150,
      height: 40,
      rotate: 0,
      borderWidth: 2,
      borderRadius: 0,
    },
    animations: [],
    icon: "icon-xuanzeqi",
    linkage: [],
    propValue: {
      options: [],
      placeholder: "请选择",
      filterable: false,
      multiple: false,
    },
  },
  {
    type: LabelEnum.switch,
    label: "下拉选择框",
    name: "select",
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
      width: 40,
      height: 20,
      rotate: 0,
    },
    animations: [],
    icon: "icon-kaiguan",
    linkage: [],
    propValue: {
      size: "default",
      disabled: false,
      switchValue: true,
    },
  },
  {
    type: LabelEnum.pagination,
    label: "分页",
    name: "select",
    collapse: [],
    events: {
      onClick: {
        type: EventTypeEnum.None,
      },
      onChange: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 220,
      height: 35,
      rotate: 0,
    },
    animations: [],
    icon: "icon-fenye",
    linkage: [],
    propValue: {
      total: 50,
      pagerCount: 7,
      pageSize: 10,
      small: false,
    },
  },
  {
    type: LabelEnum.progress,
    label: "分页",
    name: "select",
    collapse: [],
    events: {
      onChange: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 220,
      height: 35,
      rotate: 0,
    },
    animations: [],
    icon: "icon-jindutiao",
    linkage: [],
    propValue: {
      percentage: 50,
      status: "success",
      striped: true,
      stripedFlow: true,
    },
  },
  {
    type: LabelEnum.checkbox,
    label: "复选框组",
    name: "select",
    collapse: [],
    events: {
      onChange: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 220,
      height: 35,
      rotate: 0,
    },
    animations: [],
    icon: "icon-duoxuankuang1",
    linkage: [],
    propValue: {
      options: [
        {
          label: "label",
          value: "label",
        },
      ],
      min: 0,
      max: 2,
      button: false,
      border: false,
      size: "default",
      fill: "#409EFF",
      textColor: "#ffffff",
    },
  },
  {
    type: LabelEnum.radio,
    label: "单选框组",
    name: "select",
    collapse: [],
    events: {
      onChange: {
        type: EventTypeEnum.None,
      },
    },
    isLock: false,
    isRoot: true,
    style: {
      left: 0,
      top: 0,
      width: 220,
      height: 35,
      rotate: 0,
    },
    animations: [],
    icon: "icon-BAI-danxuankuangs",
    linkage: [],
    propValue: {
      options: [
        {
          label: "label",
          value: "label",
        },
      ],
      button: false,
      border: false,
      size: "default",
      fill: "#409EFF",
      textColor: "#ffffff",
    },
  },
];

console.log(componentList[0])

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
  [LabelEnum.container]: markRaw(VContainer),
  [LabelEnum.input]: markRaw(VInput),
  [LabelEnum.echart]: markRaw(Echart),
  [LabelEnum.select]: markRaw(VSelect),
  [LabelEnum.switch]: markRaw(VSwitch),
  [LabelEnum.pagination]: markRaw(VPagination),
  [LabelEnum.progress]: markRaw(VProcess),
  [LabelEnum.checkbox]: markRaw(VCheckGroup),
  [LabelEnum.radio]: markRaw(VRadio),
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
