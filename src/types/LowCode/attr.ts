import type { Component } from "vue";
import type { LowCanvasData } from "./base";
import type { PropValue } from "./PropValue";
import type { ComponentStyle } from "./style";
import type { LabelEnum } from "./base";

export type Attr = {
  name: string;
  prop: keyof LowCanvasData;
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
  name: string;
  type: AttrEnum;
  label: string;
  component: Component;
  predefineColors: string[];
  step?: number;
};

export type AttrData = {
  title: string;
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
  [AttrEnum.OTHER]: Pick<AttrComponent, "component" | "name" | "type">;
  [AttrEnum.COLORPick]: Pick<
    AttrComponent,
    "component" | "name" | "type" | "label" | "predefineColors"
  >;
  [AttrEnum.ALL]: AttrComponent;
};
