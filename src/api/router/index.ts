import type { User } from "@/types/model/User";
import request from "../config/axios";
import type { Router } from "@/types/model/Router";
import type { RouterValidator } from "@/utils/validator/router";

export const getRouterList = (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return request<
    any,
    {
      data: Router[];
      count: number;
      message: string;
    }
  >({
    method: "get",
    url: "/router/list",
    params: {
      offset,
      limit,
    },
  });
};

export const deleteRouter = (id: string) => {
  return request<
    any,
    {
      message: string;
    }
  >({
    method: "delete",
    url: "/router/delete",
    params: {
      id,
    },
  });
};

export const createRouter = (data: RouterValidator) => {
  return request<
    any,
    {
      code: number;
      message: string;
    }
  >({
    method: "post",
    url: "/router/create",
    data,
  });
};

export const updateRouter = (id: string, data: RouterValidator) => {
  return request<
    any,
    {
      message: string;
    }
  >({
    method: "post",
    url: "/router/update",
    data: {
      id,
      ...data,
    },
  });
};
