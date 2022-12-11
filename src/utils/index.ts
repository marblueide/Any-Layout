export * from "./style";
export * from "./calculateComponentPositonAndSize";

export const swap = (arr: any[], i: number, j: number) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  return [arr[i], arr[j]];
};
