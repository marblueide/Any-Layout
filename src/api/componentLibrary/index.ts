import type { ComponentLibrary } from "@/types/model/ComponentLibrary";
import request from "../config/axios";

export function getComponentLibraryById(id: string) {
  return request<
    any,
    {
      data: ComponentLibrary;
      message: string;
    }
  >({
    url: `/componentLibrary/one/${id}`,
  });
}

export function getComponentLibraryList(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;
  return request<
    any,
    {
      data: {
        list: ComponentLibrary[];
        total: number;
      };
      message: string;
    }
  >({
    url: "/componentLibrary/list",
    method: "get",
    params: {
      offset,
      limit,
    },
  });
}

export function createComponentLibrary(libName: string, description?: string) {
  return request({
    url: "/componentLibrary/create",
    method: "post",
    data: {
      libName,
      description,
    },
  });
}

export function updateComponentLibrary(data: {
  id: string;
  libName?: string;
  description?: string;
}) {
  return request({
    url: "/componentLibrary/update",
    method: "post",
    data,
  });
}

export function deleteComponentLibrary(id: string) {
  return request({
    url: `/componentLibrary/${id}`,
    method: "delete",
  });
}
