import type { Component } from "vue";
import type { LowCanvasData } from "./base";
import type { PropValueType } from "./PropValue";
import type { ComponentStyle } from "./style";
import type { LabelEnum } from "./base";
import type { EventEnum } from "./event";
import type * as echarts from 'echarts';

export type Attr =
  | {
      name: string;
      prop: keyof LowCanvasData;
      data: AttrData[];
    }
  | {
      name: string;
      data: AttrData[];
    };

export enum AttrEnum {
  INPUT = "input",
  INPUTNUMBER = "inputNumber",
  INPUTTYPE = 'inputType',
  SELECT = "select",
  OTHER = "other",
  COLORPick = "colorPick",
  ALL = "all",
}

export type AttrComponent = {
  name: keyof typeof EventEnum | keyof ComponentStyle | keyof PropValueType;
  type: AttrEnum;
  label: string;
  component: Component;
  predefineColors?: string[];
  step?: number;
  selectOptions?:{value:any,label:any}[]
  echartOption?:echarts.EChartsCoreOption,
  defaultOption?:any
};

export type AttrData = {
  name:string;
  title: string;
  prop?: keyof LowCanvasData;
  components: AttrComponent[];
};
