import type { User } from "./User";

export type UserGroup = {
  id: string;
  groupName: string;
  rules: string;
  status: number;
  users: User[];
  createTime: string;
  deleteTime: string;
};