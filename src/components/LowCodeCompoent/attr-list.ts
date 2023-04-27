import { markRaw } from "vue";
import type { Attr } from "../../types/LowCode/index";
import { AttrEnum } from "../../types/LowCode/attr";
import Input from "./Attrs/baseAttr/input.vue";
import Select from "./Attrs/baseAttr/select.vue";
import ColorPick from "./Attrs/baseAttr/colorPick.vue";
import InputType from "./Attrs/baseAttr/inputType.vue";
import HorizontalAlign from "./Attrs/HorizontalAlign.vue";
import VerticalAlign from "./Attrs/VerticalAlign.vue";
import BorderRadius from "./Attrs/BorderRadius.vue";
import Shadow from "./Attrs/Shadow.vue";
import Event from "./Attrs/event/index.vue";
import { barPresets,LinePresets,piePresets } from "./Echart/Presets/line";
import StyleBox from "./Attrs/StyleBox/index.vue";

export const attrList: Attr[] = [
  {
    name: "内容",
    data: [
      {
        name: "data",
        title: "数据",
        prop: "propValue",
        components: [
          {
            name: "value",
            type: AttrEnum.INPUT,
            label: "内容",
            component: markRaw(Input),
          },
          {
            name: "src",
            type: AttrEnum.INPUT,
            label: "图片地址",
            component: markRaw(Input),
          },
          {
            name: "fit",
            type: AttrEnum.SELECT,
            label: "图片填充方式",
            component: markRaw(Select),
            selectOptions: [
              {
                value: "fit",
                label: "fit",
              },
              {
                value: "contain",
                label: "contain",
              },
              {
                value: "cover",
                label: "cover",
              },
              {
                value: "none",
                label: "none",
              },
              {
                value: "scale-down",
                label: "scale-down",
              },
            ],
          },
          {
            name:"echartOption",
            type: AttrEnum.SELECT,
            label:"折线图预设",
            component:markRaw(Select),
            selectOptions:LinePresets
          },
          {
            name:"echartOption",
            type: AttrEnum.SELECT,
            label:"柱状图预设",
            component:markRaw(Select),
            selectOptions:barPresets
          },
          {
            name:"echartOption",
            type: AttrEnum.SELECT,
            label:"饼图预设",
            component:markRaw(Select),
            selectOptions:piePresets
          }
        ],
      },
      {
        name: "event",
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
        name: "baseStyle",
        components: [
          {
            name: "left",
            type: AttrEnum.INPUTNUMBER,
            label: "X坐标",
            component: markRaw(Input),
            postfix:'px'
          },
          {
            name: "top",
            type: AttrEnum.INPUTNUMBER,
            label: "Y坐标",
            component: markRaw(Input),
            postfix:'px'
          },
          {
            name: "width",
            type: AttrEnum.INPUTNUMBER,
            label: "宽度",
            component: markRaw(Input),
            postfix:'px'
          },
          {
            name: "height",
            type: AttrEnum.INPUTNUMBER,
            label: "高度",
            component: markRaw(Input),
            postfix:'px'
          },
          {
            name: "rotate",
            type: AttrEnum.INPUTNUMBER,
            label: "旋转",
            component: markRaw(Input),
            postfix:'deg'
          },
          {
            name:"styleBox",
            type:AttrEnum.OTHER,
            label:"样式盒",
            component:markRaw(StyleBox),
          }
        ],
      },
      {
        name: "colorConfig",
        title: "颜色配置",
        components: [
          {
            name: "background",
            type: AttrEnum.COLORPick,
            label: "背景颜色",
            component: markRaw(ColorPick),
            predefineColors: [],
          },
        ],
      },
      {
        name: "font",
        title: "文字",
        components: [
          {
            name: "fontSize",
            type: AttrEnum.INPUTNUMBER,
            label: "文字大小",
            component: markRaw(Input),
            step: 0.1,
            postfix:'px'
          },
          {
            name:'textIndent',
            type:AttrEnum.INPUTTYPE,
            label:"文本缩进",
            component:markRaw(InputType),
            selectOptions:[
              {
                value:'px',
                label:'px'
              },
              {
                value:'em',
                label:'em'
              },
              {
                value:'%',
                label:'%'
              },
            ],
            defaultOption:'px'
          }
        ],
      },
      {
        name: "align",
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
        ],
      },
      {
        name: "border",
        title: "边框轮廓",
        components: [
          {
            name: "borderWidth",
            type: AttrEnum.INPUTNUMBER,
            label: "边框宽度",
            component: markRaw(Input),
            postfix:'px'
          },
          {
            name: "borderRadius",
            type: AttrEnum.OTHER,
            label: "边框圆角",
            component: markRaw(BorderRadius),
          },
          {
            name: "boxShadow",
            type: AttrEnum.OTHER,
            label: "边框阴影",
            component: markRaw(Shadow),
          },
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
