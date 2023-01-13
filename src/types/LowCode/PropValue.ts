import { LabelEnum, type LowCanvasData } from ".";
export type PropValue = {
  [LabelEnum.button]: {
    value: string;
  };
  [LabelEnum.picture]: {
    src: string;
    fit: string;
  };
  [LabelEnum.text]: {
    value: string;
  };
  [LabelEnum.group]: LowCanvasData<LabelEnum>[];
};
