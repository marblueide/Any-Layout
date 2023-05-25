import type { User } from "@/types/model/User";
import request from "../config/axios";
import type { Router } from "@/types/model/Router";
import type { RouterValidator } from "@/utils/validator/router";
import type { UserGroup } from "@/types/model/UserGroup";

export const getUserGroupList = () => {
  return request<
    any,
    {
      data: UserGroup[];
      message: string;
      count: number;
    }
  >({
    method: "get",
    url: "/user-group/list",
  });
};

export const deleteUserGroup = (id: string) => {
  return request<
    any,
    {
      message: string;
    }
  >({
    method: "delete",
    url: "/user-group/delete",
    params: {
      id,
    },
  });
};
