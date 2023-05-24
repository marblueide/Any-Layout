import type { LoginValidator } from "@/utils/validator/login";
import request from "../config/axios";
import type { User } from "@/types/model/User";

export const login = (data: LoginValidator) => {
    return request<any, {
        access_token: string,
        message: string,
        data:User
    }>({
        method: "post",
        url:"/auth/login",
        data
    })
}

export const register = (data: LoginValidator) => {
    return request<any, {
        code: number,
        message:string
    }>({
        method: "post",
        url:"/user/register",
        data
    })
}

export const getUserList = (page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;
    return request<any, {
        data: User[],
        count: number,
        message:string
    }>({
      method: "get",
      url: "/user/list",
      params: {
        offset,
        limit,
      },
    });
};
  
export const deleteUser = (id:string) => {
    return request<any, {
        message:string
    }>({
      method: "delete",
      url: "/user/delete",
      params: {
       id
      },
    });
}