import type { User } from "@/types/model/User";
import request from "../config/axios";
import type { Page } from "@/types/model/page";

export const getPageList = (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return request({
    method: "get",
    url: "/page/list",
    params: {
      offset,
      limit,
    },
  });
};

export const createPage = (pageName: string, describe: string) => {
  return request<
    any,
    {
      data: Page[];
      message: string;
    }
  >({
    method: "post",
    url: "/page/create",
    data: {
      pageName,
      describe,
    },
  });
};

export const updatePage = (data: {
  id: string;
  pageName?: string;
  describe?: string;
  pageData?: string;
  user?: string;
}) => {
  return request<
    any,
    {
      data: any;
      message: string;
    }
  >({
    method: "post",
    url: "/page/update",
    data,
  });
};

export const getPageById = (id: string) => {
  return request<any, {
    data: Page,
    message:string
  }>({
    url: "/page/one",
    method: "get",
    params: {
      id,
    },
  });
};
