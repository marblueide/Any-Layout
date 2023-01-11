import type { LowCanvasData } from "./index";
import type { ComponentStyle } from "./style";
export enum snapShotEnum {
  add = "add",
  remove = "remove",
  style = "style",
  compose = "compose",
  clear = "clear",
  index = "index",
}

type snapShotEnumValue = {
  [snapShotEnum.clear]: {};
  [snapShotEnum.add]: {
    value: LowCanvasData;
  };
  [snapShotEnum.remove]: {
    value: {
      index: number;
      data: LowCanvasData;
    };
  };
  [snapShotEnum.style]: {
    value: {
      id: string;
      data: [before: ComponentStyle, current: ComponentStyle];
    };
  };
  [snapShotEnum.compose]: {
    value: snapShotType[];
  };
  [snapShotEnum.index]: {
    value: number[];
  };
};

export type snapShotType<T extends snapShotEnum = snapShotEnum> = {
  [k in keyof snapShotEnumValue[T]]: snapShotEnumValue[T][k];
} & {
  type: T;
};
