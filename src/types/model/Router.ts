import type { UserGroup } from "./UserGroup";

export type Router = {
  id: string;

  name: string;

  path: string;

  userGroup: UserGroup[];

  createTime: string;

  updateTime: string;

  deleteTime: string;
};
