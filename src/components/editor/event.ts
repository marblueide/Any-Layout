import { LabelEnum, MenuShowType, MenuType } from "@/types";
import { difference, split } from "lodash-es";
import { appStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { curry } from "lodash-es";
import { compose as composeFn } from "@/utils";

const { bottom, copy, delet, down, paste, shear, top, up } =
  appStore.contextMenu;
const { areaData, isShowArea } = storeToRefs(appStore.area);
const { compose } = appStore.area;
const { splite } = appStore.lowStore;
const { currentComponent } = storeToRefs(appStore.state);
const { save } = appStore.state;
const { backSnapshot } = appStore.stack;
const { stackIndex } = storeToRefs(appStore.stack);

export type menuObj = {
  type: MenuType;
  label: string;
  fn: (...args: any[]) => void;
};

export const menuList: menuObj[] = [
  //右键菜单列表
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
  //不同的右键菜单
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

export const downKeys: Record<MenuType, number> = {
  [MenuType.Copy]: 67, //c复制
  [MenuType.Paste]: 86, //v黏贴
  [MenuType.Shear]: 88, //x剪切
  [MenuType.Delete]: 68, //delete删除
  [MenuType.Top]: 84, //t置顶
  [MenuType.Bottom]: 66, //b置底
  [MenuType.Up]: 38, // ↑层上移
  [MenuType.Down]: 40, //↓层下移
  [MenuType.Group]: 71, //g组合
  [MenuType.Splite]: 70, //f拆分
  [MenuType.Save]: 83, //s保存
  [MenuType.Cancel]: 90, //z撤销
};

const handleAreaIdFn = (fn: (...args: any[]) => void) => {
  return () => {
    let ids: string[] = [];
    if (isShowArea.value) {
      ids = areaData.value.components;
    } else if (currentComponent.value) {
      ids.push(currentComponent.value.id!);
    }
    if(ids.length == 0) return false
    fn(...ids);
    return true
  };
};

const handleCurrentFn = (fn: (...args: any[]) => void) => {
  return () => {
    currentComponent.value && fn(currentComponent.value.id!)
    return true
  };
};

const handleMessage = curry((message: string) => {
  return (flag: boolean) => {
    if (flag) {
      ElMessage({
        type: "success",
        message,
        duration:1000
      });
    }
  };
});

const handleCompose = () => {
  if (isShowArea.value) {
    compose();
    return true
  }
};

const handleSplit = () => {
  if (
    currentComponent.value &&
    currentComponent.value.type == LabelEnum.group
  ) {
    splite();
    return true
  }
};

const handleBack = () => {
  if(stackIndex.value > -1){
    backSnapshot()
    return true
  }
}

export const keysMapFn = {
  [downKeys[MenuType.Copy]]: composeFn(
    handleAreaIdFn(copy),
    handleMessage("复制成功")
  ), //c复制
  [downKeys[MenuType.Paste]]: composeFn(
    () => {
      paste(false)()
      return true
    },
    handleMessage("粘贴成功")
  ), //v粘贴
  [downKeys[MenuType.Shear]]: composeFn(
    handleAreaIdFn(shear),
    handleMessage("剪切成功")
  ), //x剪切
  [downKeys[MenuType.Delete]]: composeFn(
    handleAreaIdFn(delet),
    handleMessage("删除成功")
  ), //delete删除
  [downKeys[MenuType.Top]]: composeFn(
    handleCurrentFn(top),
    handleMessage("置顶成功")
  ), //t置顶
  [downKeys[MenuType.Bottom]]: composeFn(
    handleCurrentFn(down),
    handleMessage("置底成功")
  ), //b置底
  [downKeys[MenuType.Up]]: composeFn(
    handleCurrentFn(up),
    handleMessage("层上移成功")
  ), // ↑层上移
  [downKeys[MenuType.Down]]: composeFn(
    handleCurrentFn(down),
    handleMessage("层下移成功")
  ), //↓层下移
  [downKeys[MenuType.Group]]: composeFn(
    handleCompose,
    handleMessage("组合成功")
  ), //g组合
  [downKeys[MenuType.Splite]]: composeFn(
    handleSplit,
    handleMessage("拆分成功")
  ), //f拆分
  [downKeys[MenuType.Save]]: composeFn(save, handleMessage("保存成功")), //s保存
  [downKeys[MenuType.Cancel]]: composeFn(
    handleBack,
    handleMessage("撤销成功")
  ),
};
export const singleKey: number[] = [downKeys.Save];
