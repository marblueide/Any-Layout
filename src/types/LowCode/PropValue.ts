import type { LabelEnum } from ".";

export type PropValuew = {
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
};
