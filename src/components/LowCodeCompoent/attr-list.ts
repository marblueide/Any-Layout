import { markRaw } from "vue";
import type { Attr } from "../../types/LowCode/index";
import { AttrEnum } from "../../types/LowCode/attr";
import Input from "./Attrs/baseAttr/input.vue";
import Switch from "./Attrs/baseAttr/switch.vue";
import Select from "./Attrs/baseAttr/select.vue";
import Option from "./Attrs/baseAttr/option.vue";
import ColorPick from "./Attrs/baseAttr/colorPick.vue";
import InputType from "./Attrs/baseAttr/inputType.vue";
import HorizontalAlign from "./Attrs/HorizontalAlign.vue";
import VerticalAlign from "./Attrs/VerticalAlign.vue";
import BorderRadius from "./Attrs/BorderRadius.vue";
import Shadow from "./Attrs/Shadow.vue";
import Event from "./Attrs/event/index.vue";
import EchartOption from "./Attrs/EchartOption.vue";
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
            name: "echartOption",
            type: AttrEnum.OTHER,
            label: "echart预设",
            component: markRaw(EchartOption),
          },
          {
            name: "placeholder",
            type: AttrEnum.INPUT,
            label: "提示语",
            component: markRaw(Input),
          },
          {
            name: "multiple",
            type: AttrEnum.SWITCH,
            label: "是否多选",
            component: markRaw(Switch),
          },
          {
            name: "filterable",
            type: AttrEnum.SWITCH,
            label: "是否可搜索",
            component: markRaw(Switch),
          },
          {
            name: "options",
            type: AttrEnum.OPTION,
            label: "选项配置",
            component: markRaw(Option),
          },
          {
            name: "switchValue",
            type: AttrEnum.SWITCH,
            label: "默认值",
            component: markRaw(Switch),
          },
          {
            name: "disabled",
            type: AttrEnum.SWITCH,
            label: "是否禁用",
            component: markRaw(Switch),
          },
          {
            name: "small",
            type: AttrEnum.SWITCH,
            label: "是否使用小型分页样式",
            component: markRaw(Switch),
          },
          {
            name: "total",
            type: AttrEnum.INPUTNUMBER,
            label: "总条目数",
            component: markRaw(Input),
          },
          {
            name: "pagerCount",
            type: AttrEnum.INPUTNUMBER,
            label: "设置最大页码按钮数",
            component: markRaw(Input),
          },
          {
            name: "pageSize",
            type: AttrEnum.INPUTNUMBER,
            label: "每页显示条目个数",
            component: markRaw(Input),
          },
          {
            name: "percentage",
            type: AttrEnum.INPUTNUMBER,
            label: "当前进度",
            component: markRaw(Input),
          },
          {
            name: "striped",
            type: AttrEnum.SWITCH,
            label: "在进度条上增加条纹",
            component: markRaw(Switch),
          },
          {
            name: "stripedFlow",
            type: AttrEnum.SWITCH,
            label: "让进度条上的条纹流动起来",
            component: markRaw(Switch),
          },
          {
            name: "status",
            type: AttrEnum.SELECT,
            label: "进度条当前状态",
            component: markRaw(Select),
            selectOptions: [
              {
                value: "success",
                label: "success",
              },
              {
                value: "exception",
                label: "exception",
              },
              {
                value: "warning",
                label: "warning",
              },
            ],
          },
          {
            name: "min",
            type: AttrEnum.INPUTNUMBER,
            label: "可被勾选的 checkbox 的最小数量",
            component: markRaw(Input),
          },
          {
            name: "max",
            type: AttrEnum.INPUTNUMBER,
            label: "可被勾选的 checkbox 的最大数量",
            component: markRaw(Input),
          },
          {
            name: "button",
            type: AttrEnum.SWITCH,
            label: "按钮型",
            component: markRaw(Switch),
          },
          {
            name: "border",
            type: AttrEnum.SWITCH,
            label: "是否有边框",
            component: markRaw(Switch),
          },
          {
            name: "size",
            type: AttrEnum.SELECT,
            label: "尺寸",
            component: markRaw(Select),
            selectOptions: [
              {
                value: "large",
                label: "large",
              },
              {
                value: "default",
                label: "default",
              },
              {
                value: "small",
                label: "small",
              },
            ],
          },
          {
            name: "fill",
            type: AttrEnum.COLORPick,
            label: "当按钮为活跃状态时的边框和背景颜色",
            component: markRaw(ColorPick),
            predefineColors: [],
          },
          {
            name: "textColor",
            type: AttrEnum.COLORPick,
            label: "当按钮为活跃状态时的字体颜色",
            component: markRaw(ColorPick),
            predefineColors: [],
          },
          {
            name: "shadow",
            type: AttrEnum.SELECT,
            label: "设置阴影显示时机",
            component: markRaw(Select),
            selectOptions: [
              {
                value: "always",
                label: "always",
              },
              {
                value: "never",
                label: "never",
              },
              {
                value: "hover",
                label: "hover",
              },
            ],
          },
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
            postfix: "px",
          },
          {
            name: "top",
            type: AttrEnum.INPUTNUMBER,
            label: "Y坐标",
            component: markRaw(Input),
            postfix: "px",
          },
          {
            name: "width",
            type: AttrEnum.INPUTNUMBER,
            label: "宽度",
            component: markRaw(Input),
            postfix: "px",
          },
          {
            name: "height",
            type: AttrEnum.INPUTNUMBER,
            label: "高度",
            component: markRaw(Input),
            postfix: "px",
          },
          {
            name: "rotate",
            type: AttrEnum.INPUTNUMBER,
            label: "旋转",
            component: markRaw(Input),
            postfix: "deg",
          },
          {
            name: "styleBox",
            type: AttrEnum.OTHER,
            label: "样式盒",
            component: markRaw(StyleBox),
          },
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
            postfix: "px",
          },
          {
            name: "textIndent",
            type: AttrEnum.INPUTTYPE,
            label: "文本缩进",
            component: markRaw(InputType),
            selectOptions: [
              {
                value: "px",
                label: "px",
              },
              {
                value: "em",
                label: "em",
              },
              {
                value: "%",
                label: "%",
              },
            ],
            defaultOption: "px",
          },
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
            name: "borderColor",
            type: AttrEnum.COLORPick,
            label: "边框颜色",
            component: markRaw(ColorPick),
          },
          {
            name: "borderWidth",
            type: AttrEnum.INPUTNUMBER,
            label: "边框宽度",
            component: markRaw(Input),
            postfix: "px",
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
