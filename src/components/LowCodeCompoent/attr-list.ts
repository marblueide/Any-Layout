import { markRaw } from "vue";
import type { Attr } from "../../types/LowCode/index";
import { AttrEnum, type AttrEnumType } from "../../types/LowCode/attr";
import Input from "./Attrs/baseAttr/input.vue";
import ColorPick from "./Attrs/baseAttr/colorPick.vue";
import HorizontalAlign from "./Attrs/HorizontalAlign.vue";
import VerticalAlign from "./Attrs/VerticalAlign.vue";
import BorderRadius from "./Attrs/BorderRadius.vue";
import Shadow from "./Attrs/Shadow.vue";
import Event from "./Attrs/event/index.vue";

export const attrList: Attr[] = [
  {
    name: "内容",
    data: [
      {
        name:'data',
        title: "数据",
        prop: "propValue",
        components: [
          {
            name: "value",
            type: AttrEnum.INPUT,
            label: "内容",
            component: markRaw(Input),
          },
        ] as [AttrEnumType<AttrEnum.INPUT>],
      },
      {
        name:"event",
        title: "事件",
        prop: "events",
        components: [
          {
            name: "onClick",
            label: "onClick",
            type: AttrEnum.OTHER,
            component: markRaw(Event),
          },
          {
            name: "onChange",
            label: "onChange",
            type: AttrEnum.OTHER,
            component: markRaw(Event),
          },
          {
            name: "onInput",
            label: "onInput",
            type: AttrEnum.OTHER,
            component: markRaw(Event),
          },
        ],
      },
    ],
  },
  {
    name: "样式",
    prop: "style",
    data: [
      {
        title: "基本样式",
        name:"baseStyle",
        components: [
          {
            name: "left",
            type: AttrEnum.INPUTNUMBER,
            label: "X坐标",
            component: markRaw(Input),
          },
          {
            name: "top",
            type: AttrEnum.INPUTNUMBER,
            label: "Y坐标",
            component: markRaw(Input),
          },
          {
            name: "width",
            type: AttrEnum.INPUTNUMBER,
            label: "宽度",
            component: markRaw(Input),
          },
          {
            name: "height",
            type: AttrEnum.INPUTNUMBER,
            label: "高度",
            component: markRaw(Input),
          },
        ] as [
          AttrEnumType<AttrEnum.INPUTNUMBER>,
          AttrEnumType<AttrEnum.INPUTNUMBER>,
          AttrEnumType<AttrEnum.INPUTNUMBER>,
          AttrEnumType<AttrEnum.INPUTNUMBER>
        ],
      },
      {
        name:"colorConfig",
        title: "颜色配置",
        components: [
          {
            name: "background",
            type: AttrEnum.COLORPick,
            label: "背景颜色",
            component: markRaw(ColorPick),
            predefineColors: [],
          },
        ] as [AttrEnumType<AttrEnum.COLORPick>],
      },
      {
        name:"font",
        title: "文字",
        components: [
          {
            name: "fontSize",
            type: AttrEnum.INPUTNUMBER,
            label: "文字大小",
            component: markRaw(Input),
            step: 0.1,
          },
        ] as [AttrEnumType<AttrEnum.INPUTNUMBER>],
      },
      {
        name:"align",
        title: "排列对齐",
        components: [
          {
            name: "justifyContent",
            label: "水平方向",
            type: AttrEnum.OTHER,
            component: markRaw(HorizontalAlign),
          },
          {
            name: "alignItems",
            label: "垂直方向",
            type: AttrEnum.OTHER,
            component: markRaw(VerticalAlign),
          },
        ] as [AttrEnumType<AttrEnum.OTHER>, AttrEnumType<AttrEnum.OTHER>],
      },
      {
        name:"border",
        title: "边框轮廓",
        components: [
          {
            name: "borderWidth",
            type: AttrEnum.INPUTNUMBER,
            label: "边框宽度",
            component: markRaw(Input),
          },
          {
            name: "borderRadius",
            type: AttrEnum.OTHER,
            label: "borderRadius",
            component: markRaw(BorderRadius),
          },
          {
            name: "boxShadow",
            type: AttrEnum.OTHER,
            label: "boxShadow",
            component: markRaw(Shadow),
          },
        ] as [
          AttrEnumType<AttrEnum.INPUTNUMBER>,
          AttrEnumType<AttrEnum.OTHER>,
          AttrEnumType<AttrEnum.OTHER>
        ],
      },
    ],
  },
];

export const getAllCollapse = () => {
  return attrList
    .map((item) => {
      return item.data.map((data) => data.name);
    })
    .flat(1);
};
