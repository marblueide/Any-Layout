export type MenuState = {
  type:MenuShowType
  left: number;
  top: number;
  show: boolean;
};

export enum MenuShowType {
  //右键菜单的类型，不同的集合
  Editor = "Editor",
  Component = "Component",
  Group = "Group",
  Area = "Area"
}

export enum MenuType {
  Copy = "Copy",  //复制
  Paste = "Paste",  //黏贴
  Shear = "Shear",  //剪切
  Delete = "Delete", //删除
  Top = "Top",  //置顶
  Bottom = "Bottom",  //置底
  Up = "Up",   //层上移
  Down = "Down",  //层下移
  Group = "Group", //组合
  Splite = "Splite",  //拆分
  Save = "Save", //保存
  Cancel = 'Cancel' //撤销
}