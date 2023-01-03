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
  component: () => Component | string;
  attr: string[][];
  icon: string | Component;
  events: {
    [k in string]: (...arg: any) => any;
  };
  isLock: boolean;
  style: Partial<ComponentStyle>;
  propValue: T extends LabelEnum.group
    ? LowCanvasData<LabelEnum>[]
    : PropValue[T];
  animations: DataAnimation[];
  linkage: DataLinkage[];
};

export type AttrComponent = {
<<<<<<< HEAD
  [k in string]: Component;
};

export type Attr = {
=======
  [k in string]: () => Component | string;
};

export type Attr = {
  name: string;
  data: AttrData[];
  active: string[];
};

export type AttrData<T = AttrComponent> = {
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
  name: string;
  data: AttrData[];
  all: () => string[];
};

export type AttrData<T extends string = string> = {
  name: T;
  title: string;
<<<<<<< HEAD
  components: Component[];
=======
  components: T[keyof T][];
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
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
  components: LowCanvasData[];
};
