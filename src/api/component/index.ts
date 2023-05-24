import type { Component } from "@/types/model/Component";
import request from "../config/axios";

export function getComponentById(id: string) {
  return request<
    any,
    {
      data: Component;
      message: string;
    }
  >({
    url: `/component/one/${id}`,
  });
}

export function getComponentList(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;
  return request<
    any,
    {
      data: {
        list: Component[];
        total: number;
      };
      message: string;
    }
  >({
    url: "/component/list",
    method: "get",
    params: {
      offset,
      limit,
    },
  });
}

export function getComponentListByLibId(id: string) {
  return request<
    any,
    {
      data: Component[];
      message: string;
    }
  >({
    url: "/component/listByLibId",
    method: "get",
    params: {
      id,
    },
  });
}

export function createComponent(data: {
  componentName: string;
  ComponentData: string;
  libId: string;
}) {
  return request({
    url: "/component/create",
    method: "post",
    data,
  });
}

export function updateComponent(data: {
  id: string;
  componentName?: string;
  ComponentData?: string;
  libId?: string;
}) {
  return request({
    url: "/component/update",
    method: "post",
    data,
  });
}

export function deleteComponent(id: string) {
  return request({
    url: `/component/${id}`,
    method: "delete",
  });
}
