import { LabelEnum, type LowCanvasData } from ".";

export type PropValueType = {
  value: string;
  src: string;
  fit: string;
};

export type PropValue = {
  [LabelEnum.button]: Pick<PropValueType, "value">;
  [LabelEnum.picture]: Pick<PropValueType, "src" | "fit">;
  [LabelEnum.text]: Pick<PropValueType, "value">;
  [LabelEnum.group]: LowCanvasData<LabelEnum>[];
};
