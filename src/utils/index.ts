export * from "./style";
export * from "./calculateComponentPositonAndSize";

export const swap = (arr: any[], i: number, j: number) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  return [arr[i], arr[j]];
};

export const compose =
  (...fns: ((...args: any[]) => void)[]) =>
  (...args: any[]) =>
    fns.reduce(
      (val: any, fn: (...args: any[]) => void) =>
        fn.apply(null, [].concat(val)),
      args
    );

export const composeRight =
  (...fns: ((...args: any[]) => void)[]) =>
  (...args: any[]) =>
    fns.reduceRight(
      (val: any, fn: (...args: any[]) => void) =>
        fn.apply(null, [].concat(val)),
      args
    );
