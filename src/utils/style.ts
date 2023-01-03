import {
  degFix,
  noneFix,
  shapeStyle,
  type ComponentStyle,
} from "@/types/LowCode/style";
import { cloneDeep } from "lodash-es";
import type { StyleValue } from "vue";
import type { LowCanvasType } from "../types/LowCode/index";
import { angleToRadian } from "./calculateComponentPositonAndSize";
<<<<<<< HEAD
import { isNil } from "lodash-es";
=======

const degFix = ["rotate"];
const noneFix = [
  "opacity",
  "boxShadow",
  "justifyContent",
  "alignItems",
  "alignItems",
  "background",
];
const shapeStyle = [
  "left",
  "top",
  "opacity",
  "transform",
  "width",
  "height",
  "rotate",
];
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91

export const canvasTypeToStyle = (obj: LowCanvasType): StyleValue => {
  return {
    width: obj.width + "px",
    height: obj.height + "px",
    background: obj.background,
    opacity: obj.opacity,
    transform: `scalc(${obj.scale})`,
  };
};

export const getShapeStyle = (data: Partial<ComponentStyle>) => {
  let res: {
    [k in keyof ComponentStyle]?: any;
  } = {};
  shapeStyle.forEach((key) => {
    if (data[key as keyof ComponentStyle] != undefined) {
      if (key == "rotate") {
        res[key as keyof ComponentStyle] =
          data[key as keyof ComponentStyle] + "deg";
      } else if (key == "opacity") {
        res[key as keyof ComponentStyle] = data[key as keyof ComponentStyle];
      } else {
        res[key as keyof ComponentStyle] =
          data[key as keyof ComponentStyle] + "px";
      }
    }
  });
  return res;
};

export const getComponentRotatedStyle = (style: Partial<ComponentStyle>) => {
  style = cloneDeep(style);
  if (
    !isNil(style.width) &&
    !isNil(style.rotate) &&
    !isNil(style.height) &&
    !isNil(style.left) &&
    !isNil(style.top)
  ) {
    if (style.rotate != 0) {
      const newWidth =
        style.width! * Math.abs(Math.cos(angleToRadian(style.rotate!))) +
        style.height! * Math.abs(Math.sin(angleToRadian(style.rotate!)));

      const diffX = (style.width! - newWidth) / 2; // 旋转后范围变小是正值，变大是负值

      style.left! += diffX;

      style.right = style.left! + newWidth;

      const newHeight =
        style.height! * Math.abs(Math.cos(angleToRadian(style.rotate!))) +
        style.width! * Math.abs(Math.sin(angleToRadian(style.rotate!)));
      const diffY = (newHeight - style.height!) / 2; // 始终是正
      style.top! -= diffY;
      style.bottom = style.top! + newHeight;

      style.width = newWidth;
      style.height = newHeight;
    } else {
      style.bottom = style.top! + style.height!;
      style.right = style.left! + style.width!;
    }
  }
  return style;
};

export const getOriginStyle = (data: Partial<ComponentStyle>) => {
  const res: {
    [k in string]: any;
  } = {};
  Object.keys(data).forEach((k) => {
    if (shapeStyle.includes(k)) return;
    if (noneFix.includes(k)) {
      res[k] = data[k as keyof ComponentStyle];
    } else if (degFix.includes(k)) {
      res[k] = data[k as keyof ComponentStyle] + "deg";
    } else {
      res[k] = data[k as keyof ComponentStyle] + "px";
    }
  });

  return res;
};
