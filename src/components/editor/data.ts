import { bottom, copy, delet, down, paste, shear,top, up } from "@/stores/useLowStore/moudles";
import { MenuType } from "@/types";

export type menuObj = {
  type: MenuType;
  label: string;
  fn: (...args:any[]) => void;
};

export const menuList: menuObj[] = [
  {
    type: MenuType.Copy,
    label: "复制",
    fn: copy,
  },
  {
    type: MenuType.Paste,
    label: "粘贴",
    fn: paste(true),
  },
  {
    type: MenuType.Shear,
    label: "剪切",
    fn: shear,
  },
  {
    type: MenuType.Delete,
    label: "删除",
    fn: delet,
  },
  {
    type: MenuType.Top,
    label: "置顶",
    fn: top,
  },
  {
    type: MenuType.Bottom,
    label: "置底",
    fn: bottom,
  },
  {
    type: MenuType.Up,
    label: "上移",
    fn: up,
  },
  {
    type: MenuType.Down,
    label: "下移",
    fn: down,
  },
];
