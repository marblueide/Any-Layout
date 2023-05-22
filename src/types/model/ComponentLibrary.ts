import type { Component } from "./Component";

export type ComponentLibrary{
  id: string;
  libName: string;
  description?: string;
  components: Component[];
  createTime: string;
  updateTime: string;
  deleteTime: string;
}