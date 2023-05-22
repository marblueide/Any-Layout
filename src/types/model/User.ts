import type { UserGroup } from "./UserGroup";

export type User = {
  id: string;

  username: string;

  password: string;

  userGroup: UserGroup;

  createTime: string;

  deleteTime: string;
};
