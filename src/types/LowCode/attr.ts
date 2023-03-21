import type { Component } from "vue";
import type { LowCanvasData } from "./base";
import type { PropValueType } from "./PropValue";
import type { ComponentStyle } from "./style";
import type { LabelEnum } from "./base";
import type { EventEnum } from "./event";

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
  predefineColors: string[];
  step?: number;
};

export type AttrData = {
  name:string;
  title: string;
  prop?: keyof LowCanvasData;
  components: AttrEnumType[];
};

export type AttrEnumType<T extends AttrEnum = AttrEnum> = {
  [K in keyof AttrEnumMap[T]]: AttrEnumMap[T][K];
};

type AttrDefaultComponent = Pick<
  AttrComponent,
  "component" | "name" | "type" | "label" | "step"
>;

export type AttrEnumMap = {
  [AttrEnum.INPUT]: AttrDefaultComponent;
  [AttrEnum.INPUTNUMBER]: AttrDefaultComponent;
  [AttrEnum.SELECT]: AttrDefaultComponent;
  [AttrEnum.OTHER]: Pick<
    AttrComponent,
    "component" | "name" | "type" | "label"
  >;
  [AttrEnum.COLORPick]: Pick<
    AttrComponent,
    "component" | "name" | "type" | "label" | "predefineColors"
  >;
  [AttrEnum.ALL]: AttrComponent;
};
