import type { User } from "./User";

export type Page = {
  id: string;

  pageName: string;

  router: string;

  user: User;

  pageData: string;

  describe: string;

  createTime: string;

  updateTime: string;

  deleteTime: string;
};
