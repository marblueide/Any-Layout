import type { Component } from "vue";
import type { DataAnimation, DataLinkage } from ".";
import type { PropValue } from "./PropValue";
import type { ComponentStyle } from "./style";

export enum LabelEnum {
  button = "按钮",
  picture = "图片",
  text = "文本",
  group = "组合",
}

export type pointType = "lt" | "t" | "rt" | "r" | "rb" | "b" | "lb" | "l";

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
  collapse: string[];
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

export type AreaData = {
  left: number;
  top: number;
  width: number;
  height: number;
  components: string[];
};
