import type { StyleValue } from "vue";
import type { LowCanvasType, LowCanvasData } from "../types/LowCode/index";
export const canvasTypeToStyle = (obj: LowCanvasType): StyleValue => {
  return {
    width: obj.width + "px",
    height: obj.height + "px",
    background: obj.background,
    opacity: obj.opacity,
    transform: `scalc(${obj.scale})`,
  };
};

export const getShapeStyle = (data: StyleValue) => {
  const arr: string[] = [
    "left",
    "top",
    "opacity",
    "transform",
    "width",
    "height",
    "rotate",
  ];
  let res = {};
  arr.forEach((key) => {
    //@ts-ignore
    if (data[key] != undefined) {
      if (key == "rotate") {
        //@ts-ignore
        res[key] = data[key] + "deg";
      } else if (key == "opacity") {
        //@ts-ignore
        res[key] = data[key];
      } else {
        //@ts-ignore
        res[key] = data[key] + "px";
      }
    }
  });
  return res;
};
