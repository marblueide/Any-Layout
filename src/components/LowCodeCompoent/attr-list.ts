import Border from "./Attrs/Border.vue";
import Shadow from "./Attrs/Shadow.vue";
import Arrangement from "./Attrs/Arrangement.vue";
import TextVerticalAlign from "./Attrs/TextVerticalAlign.vue";
import TextHorizontalAlign from "./Attrs/TextHorizontalAlign.vue";
import TextValue from "./Attrs/TextValue.vue";
import Background from "./Attrs/Background.vue";
import FontSize from "./Attrs/Font/FontSize.vue";
import FontColor from "./Attrs/Font/FontColor.vue";
import { markRaw } from "vue";
import type { Attr, AttrComponent } from "../../types/LowCode/index";

export const baseAttr: AttrComponent = {
  border: markRaw(Border),
  shadow: markRaw(Shadow),
  arrangement: markRaw(Arrangement),
  textVerticalAlign: markRaw(TextVerticalAlign),
  textHorizontalAlign: markRaw(TextHorizontalAlign),
  textValue: markRaw(TextValue),
  background: markRaw(Background),
  fontSize: markRaw(FontSize),
  fontColor: markRaw(FontColor),
};
export const attrList: Attr[] = [
  {
    name: "内容",
    data: [
      {
        name: "props",
        title: "属性",
        components: [baseAttr.textValue],
      },
    ],
    all() {
      return this.data.map((item) => item.name);
    },
  },
  {
    name: "样式",
    data: [
      {
        name: "font",
        title: "文本",
        components: [baseAttr.fontSize, baseAttr.fontColor],
      },
      {
        name: "align",
        title: "排列对齐",
        components: [baseAttr.textVerticalAlign, baseAttr.textHorizontalAlign],
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
    all() {
      return this.data.map((item) => item.name);
    },
  },
];
