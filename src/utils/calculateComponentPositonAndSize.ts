import type { Point, pointType } from "@/types/index";
import type { StyleValue } from "vue";

type pointInfoType = {
  center: Point;
  curPoint: Point;
  symmetricPoint: Point;
};

const calculateRotatedPointCoordinate = (
  point: { x: number; y: number },
  center: { x: number; y: number },
  rotate: number
) => {
  return {
    x:
      (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
      (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
      (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
      center.y,
  };
};

const angleToRadian = (angel: number) => {
  return (Math.PI / 180) * angel;
};

const getCenterPoint = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
};

const calculateLeftTop = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint } = pointInfo;
  const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  const newTopLeftPoint = calculateRotatedPointCoordinate(
    curPositon,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );
  const newBottomRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );

  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (newWidth > 0 && newHeight > 0) {
    //@ts-ignore
    style.width = Math.round(newWidth);
    //@ts-ignore
    style.height = Math.round(newHeight);
    //@ts-ignore
    style.left = Math.round(newTopLeftPoint.x);
    //@ts-ignore
    style.top = Math.round(newTopLeftPoint.y);
  }
};

const calculateTop = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint, curPoint } = pointInfo;
  // 由于用户拉伸时是以任意角度拉伸的，所以在求得旋转前的坐标时，只取 y 坐标（这里的 x 坐标可能是任意值），x 坐标用 curPoint 的。
  // 这个中心点（第二个参数）用 curPoint, center, symmetricPoint 都可以，只要他们在一条直线上就行
  const rotatedcurPositon = calculateRotatedPointCoordinate(
    curPositon,
    curPoint,
    //@ts-ignore
    -style.rotate
  );

  // 算出旋转前 y 坐标，再用 curPoint 的 x 坐标，重新计算它们旋转后对应的坐标
  const rotatedTopMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y,
    },
    curPoint,
    //@ts-ignore
    style.rotate
  );

  // 用旋转后的坐标和对称点算出新的高度（勾股定理）
  const newHeight = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  );

  const newCenter = {
    x:
      rotatedTopMiddlePoint.x -
      (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
    y:
      rotatedTopMiddlePoint.y +
      (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
  };

  //@ts-ignore
  let width = style.width;

  //@ts-ignore
  style.width = width;
  //@ts-ignore
  style.height = Math.round(newHeight);
  //@ts-ignore
  style.top = Math.round(newCenter.y - newHeight / 2);
  //@ts-ignore
  style.left = Math.round(newCenter.x - style.width / 2);
};

const calculateRightTop = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  let newTopRightPoint = calculateRotatedPointCoordinate(
    curPositon,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );
  let newBottomLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );

  let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
  let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;

  if (newWidth > 0 && newHeight > 0) {
    //@ts-ignore
    style.width = Math.round(newWidth);
    //@ts-ignore
    style.height = Math.round(newHeight);
    //@ts-ignore
    style.left = Math.round(newBottomLeftPoint.x);
    //@ts-ignore
    style.top = Math.round(newTopRightPoint.y);
  }
};

const calculateRight = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedcurPositon = calculateRotatedPointCoordinate(
    curPositon,
    curPoint,
    //@ts-ignore
    -style.rotate
  );
  const rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y,
    },
    curPoint,
    //@ts-ignore
    style.rotate
  );

  const newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );

  const newCenter = {
    x:
      rotatedRightMiddlePoint.x -
      (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
    y:
      rotatedRightMiddlePoint.y +
      (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2,
  };

  //@ts-ignore
  let height = style.height;

  //@ts-ignore
  style.width = Math.round(newWidth);
  //@ts-ignore
  style.height = height;
  //@ts-ignore
  style.top = Math.round(newCenter.y - style.height / 2);
  //@ts-ignore
  style.left = Math.round(newCenter.x - newWidth / 2);
};

const calculateRightBottom = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  let newTopLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );
  let newBottomRightPoint = calculateRotatedPointCoordinate(
    curPositon,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );

  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
  if (newWidth > 0 && newHeight > 0) {
    //@ts-ignore
    style.width = Math.round(newWidth);
    //@ts-ignore
    style.height = Math.round(newHeight);
    //@ts-ignore
    style.left = Math.round(newTopLeftPoint.x);
    //@ts-ignore
    style.top = Math.round(newTopLeftPoint.y);
  }
};

const calculateBottom = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedcurPositon = calculateRotatedPointCoordinate(
    curPositon,
    curPoint,
    //@ts-ignore
    -style.rotate
  );
  const rotatedBottomMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y,
    },
    curPoint,
    //@ts-ignore
    style.rotate
  );

  const newHeight = Math.sqrt(
    (rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2
  );

  const newCenter = {
    x:
      rotatedBottomMiddlePoint.x -
      (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
    y:
      rotatedBottomMiddlePoint.y +
      (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2,
  };

  //@ts-ignore
  let width = style.width;

  //@ts-ignore
  style.width = width;
  //@ts-ignore
  style.height = Math.round(newHeight);
  //@ts-ignore
  style.top = Math.round(newCenter.y - newHeight / 2);
  //@ts-ignore
  style.left = Math.round(newCenter.x - style.width / 2);
};

const calculateLeftBottom = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint } = pointInfo;
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  const newLeftBottom = calculateRotatedPointCoordinate(
    curPositon,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );
  const newRightTop = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    //@ts-ignore
    -style.rotate
  );
  const newWidth = newRightTop.x - newLeftBottom.x;
  const newHeight = newLeftBottom.y - newRightTop.y;
  if (newWidth > 0 && newHeight > 0) {
    //@ts-ignore
    style.width = Math.round(newWidth);
    //@ts-ignore
    style.height = Math.round(newHeight);
    //@ts-ignore
    style.left = Math.round(newLeftBottom.x);
    //@ts-ignore
    style.top = Math.round(newRightTop.y);
  }
};

const calculateLeft = (
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  const { symmetricPoint, curPoint } = pointInfo;
  const rotatedcurPositon = calculateRotatedPointCoordinate(
    curPositon,
    curPoint,
    //@ts-ignore
    -style.rotate
  );
  const rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y,
    },
    curPoint,
    //@ts-ignore
    style.rotate
  );

  const newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );

  const newCenter = {
    x:
      rotatedRightMiddlePoint.x -
      (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
    y:
      rotatedRightMiddlePoint.y +
      (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2,
  };

  //@ts-ignore
  let height = style.height;

  //@ts-ignore
  style.width = Math.round(newWidth);
  //@ts-ignore
  style.height = height;
  //@ts-ignore
  style.top = Math.round(newCenter.y - style.height / 2);
  //@ts-ignore
  style.left = Math.round(newCenter.x - newWidth / 2);
};

const funcs: {
  [key in pointType]: (
    style: StyleValue,
    curPositon: Point,
    proportion: number,
    pointInfo: pointInfoType
  ) => void;
} = {
  lt: calculateLeftTop,
  t: calculateTop,
  rt: calculateRightTop,
  r: calculateRight,
  rb: calculateRightBottom,
  b: calculateBottom,
  lb: calculateLeftBottom,
  l: calculateLeft,
};

export const calculateComponentPositonAndSize = (
  point: pointType,
  style: StyleValue,
  curPositon: Point,
  proportion: number,
  pointInfo: pointInfoType
) => {
  return funcs[point](style, curPositon, proportion, pointInfo);
};
