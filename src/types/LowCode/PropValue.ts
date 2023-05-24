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
  multiple: boolean
  switchValue:boolean
};

export type PropValue = {
  [LabelEnum.button]: Pick<PropValueType, "value">;
  [LabelEnum.picture]: Pick<PropValueType, "src" | "fit">;
  [LabelEnum.text]: Pick<PropValueType, "value">;
  [LabelEnum.group]: LowCanvasData<LabelEnum>[];
  [LabelEnum.container]: {};
  [LabelEnum.input]: Pick<PropValueType, "value" | "placeholder" | "type">;
  [LabelEnum.echart]: Pick<PropValueType, "echartOption">;
  [LabelEnum.select]: Pick<
    PropValueType,
    "options" | "placeholder" | "filterable" | "multiple"
  >;
  [LabelEnum.switch]: Pick<PropValueType, "size" | "disabled" | 'switchValue'>;
};
