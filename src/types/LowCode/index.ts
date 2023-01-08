import type { Component, Prop } from "vue";
import type { PropValue } from "./PropValue";
import type { ComponentStyle } from "./style";

export enum LabelEnum {
  button = "按钮",
  picture = "图片",
  text = "文本",
  group = "组合",
}

export type LowCanvasType = {
  width: number;
  height: number;
  scale: number;
  background: string;
  opacity: number;
};

export type LowCanvasData<T extends LabelEnum = LabelEnum> = {
  id?: string;
  label: T;
  name: keyof typeof LabelEnum;
  component: () => Component | string;
  attr: string[][];
  icon: string | Component;
  events: {
    [k in string]: (...arg: any) => any;
  };
  isLock: boolean;
  style: ComponentStyle;
  propValue: PropValue[T];
  animations: DataAnimation[];
  linkage: DataLinkage[];
};

export type AttrComponent = {
  [k in string]: Component;
};

export type Attr = {
  name: string;
  data: AttrData[];
  all: () => string[];
};

export type AttrData<T extends string = string> = {
  name: T;
  title: string;
  components: Component[];
};

export interface DataAnimation {
  label: string;
  value: string;
  dealy: number;
  time: number;
  isLoop: boolean;
}

export interface DataLinkage {
  id: string;
  event: string;
  style: {
    key: string;
    value: number | string;
  };
}

export type pointType = "lt" | "t" | "rt" | "r" | "rb" | "b" | "lb" | "l";

export type AreaData = {
  left: number;
  top: number;
  width: number;
  height: number;
  components: string[];
};
