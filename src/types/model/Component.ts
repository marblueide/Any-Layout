import type { ComponentLibrary } from "./ComponentLibrary";

export type Component{
  id: string;
  componentName: string;
  ComponentData: string;
  libId: ComponentLibrary;
  createTime: string;
  deleteTime: string;
}