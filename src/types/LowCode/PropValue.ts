import type { LabelEnum } from ".";

export type PropValue = {
  [LabelEnum.button]: {
    value: string;
  };
  [LabelEnum.picture]: {
    src: string;
    fit: string;
  };
};
