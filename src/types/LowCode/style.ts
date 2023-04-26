export type ComponentStyle = {
  width: number;
  height: number;
  left: number;
  top: number;
  right?: number;
  bottom?: number;
  rotate: number;
  borderWidth?: number;
  borderRadius?: number;
  boxShadow?: string;
  justifyContent?: string;
  alignItems?: string;
  background?: string;
  color?: string;
  fontSize?: number;
  textIndent?:string
};

export const degFix = ["rotate"];
export const noneFix = [
  "opacity",
  "boxShadow",
  "justifyContent",
  "alignItems",
  "alignItems",
  "background",
  "color",
  'textIndent'
];
export const shapeStyle = [
  "left",
  "top",
  "opacity",
  "transform",
  "width",
  "height",
  "rotate",
];
