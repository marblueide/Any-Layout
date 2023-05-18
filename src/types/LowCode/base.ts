import type { Component } from "vue";
import type { DataAnimation, DataLinkage } from ".";
import type { EventType } from "./event";
import type { PropValue } from "./PropValue";
import type { ComponentStyle } from "./style";

export enum LabelEnum {
  button = "button", //按钮
  picture = "picture", //图片
  text = "text",  //文本
  group = "group",  //组合
  container = "container",  //容器
  input = 'input',
  echart = "echart", // Echart
}

export type pointType = "lt" | "t" | "rt" | "r" | "rb" | "b" | "lb" | "l";

export type LowCanvasType = {
  height: number;
  scale: number;
  background: string;
  opacity: number;
};

export type LowCanvasData<T extends LabelEnum = LabelEnum> = {
  id?: string;
  label: T;
  type:T,
  name: keyof typeof LabelEnum;
  collapse: string[];
  icon: string | Component;
  events: EventType;
  isLock: boolean;
  isRoot:boolean;
  style: ComponentStyle;
  propValue: PropValue[T];
  animations: DataAnimation[];
  linkage: DataLinkage[];
};

export type AreaData = {
  left: number;
  top: number;
  width: number;
  height: number;
  components: string[];
};
