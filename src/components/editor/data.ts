import { MenuShowType, MenuType } from "@/types";
import { difference } from "lodash-es";
import { appStore } from "@/stores";

const { bottom, copy, delet, down, paste, shear, top, up } =
  appStore.contextMenu;
const { compose } = appStore.area;
const {splite} = appStore.lowStore

export type menuObj = {
  type: MenuType;
  label: string;
  fn: (...args: any[]) => void;
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
  {
    type: MenuType.Group,
    label: "组合",
    fn: compose,
  },
  {
    type: MenuType.Splite,
    label: "拆分",
    fn: splite,
  },
];

const allMenuShowType: (keyof typeof MenuType)[] = Object.keys(
  MenuType
) as (keyof typeof MenuType)[];

export const menuShowList: Record<MenuShowType, (keyof typeof MenuType)[]> = {
  [MenuShowType.Component]: difference(allMenuShowType, ["Group", "Splite"]),
  [MenuShowType.Editor]: ["Paste"],
  [MenuShowType.Group]: difference(allMenuShowType, ["Group"]),
  [MenuShowType.Area]: difference(allMenuShowType, [
    "Splite",
    "Bottom",
    "Top",
    "Up",
    "Down",
  ]),
};
