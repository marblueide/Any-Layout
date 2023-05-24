import type { User } from "@/types/model/User";
import request from "../config/axios";
import type { Page } from "@/types/model/page";

export const getPageList = (input?: string) => {
  return request({
    method: "get",
    url: "/page/list",
    params: {
      input,
    },
  });
};

export const createPage = (
  user: string,
  pageName: string,
  describe: string
) => {
  return request<
    any,
    {
      data: User[];
      message: string;
      count: number;
    }
  >({
    method: "post",
    url: "/page/create",
    data: {
      pageName,
      describe,
      user,
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
  return request<
    any,
    {
      data: Page;
      message: string;
    }
  >({
    url: "/page/one",
    method: "get",
    params: {
      id,
    },
  });
};

export const deletePage = (id: string) => {
  return request<
    any,
    {
      message: string;
    }
  >({
    method: "delete",
    url: "/page/delete",
    params: {
      id,
    },
  });
};
