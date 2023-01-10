import type { LowCanvasData } from "./index";
import type { ComponentStyle } from "./style";
export enum snapShotEnum {
  add,
  remove,
  singleStyle,
  style,
  move,
  compose,
  init,
  index,
}

type snapShotEnumValue = {
  [snapShotEnum.init]: {};
  [snapShotEnum.add]: {
    value: LowCanvasData;
  };
  [snapShotEnum.remove]: {
    value: {
      index: number;
      data: LowCanvasData;
    };
  };
  [snapShotEnum.singleStyle]: {
    value: LowCanvasData;
  };
  [snapShotEnum.style]: {
    value: {};
  };
  [snapShotEnum.compose]: {
    value: snapShotType[];
  };
  [snapShotEnum.move]: {
    value: {
      id: string;
      current: {
        left: number;
        top: number;
      };
      before: {
        left: number;
        top: number;
      };
    };
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
