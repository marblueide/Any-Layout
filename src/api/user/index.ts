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
    return request({
        method: "post",
        url:"/user/register",
        data
    })
}