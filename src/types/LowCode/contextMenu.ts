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
  Copy = "Copy",
  Paste = "Paste",
  Shear = "Shear",
  Delete = "Delete",
  Top = "Top",
  Bottom = "Bottom",
  Up = "Up",
  Down = "Down",
  Group = "Group",
  Splite = "Splite"
}