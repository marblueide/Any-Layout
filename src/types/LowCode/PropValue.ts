import { LabelEnum, type LowCanvasData } from ".";
import type * as echarts from 'echarts';

export type PropValueType = {
  value: string;
  src: string;
  fit: string;
  echartOption: echarts.EChartsCoreOption;
  placeholder:string
  type:string
};

export type PropValue = {
  [LabelEnum.button]: Pick<PropValueType, "value">;
  [LabelEnum.picture]: Pick<PropValueType, "src" | "fit">;
  [LabelEnum.text]: Pick<PropValueType, "value">;
  [LabelEnum.group]: LowCanvasData<LabelEnum>[];
  [LabelEnum.container]: {},
  [LabelEnum.input]:Pick<PropValueType,'value' | 'placeholder' | 'type'>
};
