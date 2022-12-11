import type { Component, StyleValue } from "vue";

export type LowCanvasType = {
  width: number;
  height: number;
  scale: number;
  background: string;
  opacity: number;
};

export interface LowCanvasData {
  id?: string;
  label: string;
  component: () => Component | string;
  icon: string | Component;
  events: {
    [k in string]: (...arg: any) => any;
  };
  isLock: boolean;
  style: StyleValue;
  propValue:
    | {
        [k in string]: any;
      }
    | LowCanvasData[];
  animations: DataAnimation[];
  linkage: DataLinkage[];
}

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
