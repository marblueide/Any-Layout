import { LabelEnum, type LowCanvasData } from ".";
import type * as echarts from "echarts";

export type PropValueType = {
  value: string;
  src: string;
  fit: string;
  echartOption: echarts.EChartsCoreOption;
  placeholder: string;
  type: string;
  options: any;
  size: string;
  disabled: boolean;
  filterable: boolean;
  multiple: boolean;
  switchValue: boolean;
  total: number;
  pagerCount: number;
  pageSize: number;
  small: boolean;
  percentage: number;
  status: string;
  striped: boolean;
  stripedFlow: boolean;
  min: number;
  max: number;
  button: boolean;
  border: boolean;
  fill: string;
  textColor: string;
  shadow:string
};

export type PropValue = {
  [LabelEnum.button]: Pick<PropValueType, "value">;
  [LabelEnum.picture]: Pick<PropValueType, "src" | "fit">;
  [LabelEnum.text]: Pick<PropValueType, "value">;
  [LabelEnum.group]: LowCanvasData<LabelEnum>[];
  [LabelEnum.container]: Pick<PropValueType, "shadow">;
  [LabelEnum.input]: Pick<PropValueType, "value" | "placeholder" | "type">;
  [LabelEnum.echart]: Pick<PropValueType, "echartOption">;
  [LabelEnum.select]: Pick<
    PropValueType,
    "options" | "placeholder" | "filterable" | "multiple"
  >;
  [LabelEnum.switch]: Pick<PropValueType, "size" | "disabled" | "switchValue">;
  [LabelEnum.pagination]: Pick<
    PropValueType,
    "total" | "pagerCount" | "pageSize" | "small"
  >;
  [LabelEnum.progress]: Pick<
    PropValueType,
    "percentage" | "status" | "striped" | "stripedFlow"
  >;
  [LabelEnum.checkbox]: Pick<
    PropValueType,
    | "min"
    | "max"
    | "button"
    | "border"
    | "options"
    | "size"
    | "fill"
    | "textColor"
  >;
  [LabelEnum.radio]: Pick<
    PropValueType,
    "button" | "border" | "options" | "size" | "fill" | "textColor"
  >;
};
