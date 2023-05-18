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
  styleBox?:boolean;
  padding?:string;
  margin?:string;
  opacity?:number;
  transform?:string;
  borderColor?:string
};

export const degFix = ["rotate"];
export const noneFix:(keyof ComponentStyle)[] = [
  "opacity",
  "boxShadow",
  "justifyContent",
  "alignItems",
  "alignItems",
  "background",
  "color",
  'textIndent',
  'padding',
  'margin',
  "styleBox",
  "borderColor"
];
export const shapeStyle:(keyof ComponentStyle)[] = [
  "left",
  "top",
  "opacity",
  "transform",
  "width",
  "height",
  "rotate",
];
