import { cloneDeep } from "lodash-es";
import type { StyleValue } from "vue";
import type { LowCanvasType, LowCanvasData } from "../types/LowCode/index";
import { angleToRadian } from "./calculateComponentPositonAndSize";
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

export const getComponentRotatedStyle = (style: StyleValue) => {
  style = cloneDeep(style);
  //@ts-ignore
  if (style.rotate != 0) {
    const newWidth =
      //@ts-ignore
      style.width * Math.abs(Math.cos(angleToRadian(style.rotate))) +
      //@ts-ignore
      style.height * Math.abs(Math.sin(angleToRadian(style.rotate)));
    //@ts-ignore
    const diffX = (style.width - newWidth) / 2; // 旋转后范围变小是正值，变大是负值
    //@ts-ignore
    style.left += diffX;
    //@ts-ignore
    style.right = style.left + newWidth;

    const newHeight =
      //@ts-ignore
      style.height * Math.abs(Math.cos(angleToRadian(style.rotate))) +
      //@ts-ignore
      style.width * Math.abs(Math.sin(angleToRadian(style.rotate)));
    //@ts-ignore
    const diffY = (newHeight - style.height) / 2; // 始终是正
    //@ts-ignore
    style.top -= diffY;
    //@ts-ignore
    style.bottom = style.top + newHeight;

    //@ts-ignore
    style.width = newWidth;
    //@ts-ignore
    style.height = newHeight;
  } else {
    //@ts-ignore
    style.bottom = style.top + style.height;
    //@ts-ignore
    style.right = style.left + style.width;
  }

  return style;
};
