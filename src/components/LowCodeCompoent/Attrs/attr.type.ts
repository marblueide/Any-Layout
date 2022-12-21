export enum SIZE {
  None = "none",
  S = "S",
  M = "M",
  L = "L",
}

export const defaultRadius = [
  {
    value: 0,
    title: SIZE.None,
  },
  {
    value: 6,
    title: SIZE.M,
  },
  {
    value: 24,
    title: SIZE.L,
  },
];

export const defaultShadow = [
  {
    value: "none",
    title: SIZE.None,
  },
  {
    value: "rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px",
    title: SIZE.S,
  },
  {
    value:
      "rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px",
    title: SIZE.M,
  },
  {
    value:
      "rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px",
    title: SIZE.L,
  },
];

export const defaultArrangement = [
  {
    value: "start",
    title: "左对齐",
  },
  {
    value: "center",
    title: "居中对齐",
  },
  {
    value: "start",
    title: "右对齐",
  },
  {
    value: "space-between",
    title: "两边对齐",
  },
  {
    value: "space-around",
    title: "平分",
  },
];

export const defaultTextHorizontalAlign = [
  {
    value: "start",
    title: "左对齐",
  },
  {
    value: "center",
    title: "居中对齐",
  },
  {
    value: "end",
    title: "右对齐",
  },
];

export const defaultTextverticalAlign = [
  {
    value: "start",
    title: "顶对齐",
  },
  {
    value: "center",
    title: "居中对齐",
  },
  {
    value: "end",
    title: "底对齐",
  },
];
