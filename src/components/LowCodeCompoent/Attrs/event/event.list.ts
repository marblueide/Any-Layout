import {
  type EventEnumType,
  EventTypeEnum,
  NavigateToTypeEnum,
  NavigateToOpenType,
  ShowAlertType,
  EventEnum,
  DownLoadType,
} from "../../../../types/LowCode/event";
import { markRaw } from "vue";
import router from "@/router/index";
import NavigateTo from "./component/NavigateTo.vue";
import ShowAlert from "./component/ShowAlert.vue";
import DownLoad from "./component/DownLoad.vue";
import Copy from "./component/Copy.vue";
import { ElMessage } from "element-plus";
import axios from "@/api/config/axios";

type SelectType<T = string> = {
  value: T;
  label: string;
};

export const eventDefaultList: EventEnumType = {
  //Event的默认值
  [EventTypeEnum.NavigateTo]: {
    type: EventTypeEnum.NavigateTo,
    subType: NavigateToTypeEnum.Url,
    url: "",
    target: NavigateToOpenType.Cur,
  },
  [EventTypeEnum.ShowAlert]: {
    type: EventTypeEnum.ShowAlert,
    subType: ShowAlertType.Message,
    message: "",
  },
  [EventTypeEnum.DownLoad]: {
    type: EventTypeEnum.DownLoad,
    url: "",
    name: "",
    subType: "",
  },
  [EventTypeEnum.Copy]: {
    type: EventTypeEnum.Copy,
    value: "",
  },
  [EventTypeEnum.None]: {
    type: EventTypeEnum.None,
  },
};

export const eventList: Record<EventTypeEnum, (...args: any[]) => void> = {
  [EventTypeEnum.None]: () => {
    return;
  },
  [EventTypeEnum.NavigateTo]: ({
    url,
    subType,
    target,
  }: EventEnumType[EventTypeEnum.NavigateTo]) => {
    try {
      const path = url.match(/http:\/\/|https:\/\//) ? url : `https://${url}`;
      if (target == NavigateToOpenType.Cur) {
        window.open(path, "_self");
      } else if (target == NavigateToOpenType.New) {
        window.open(path, "_blank");
      }
    } catch (error) {
      console.log(error,'请输入正确的地址')
      ElMessage({
        type:"error",
        message:"请输入正确的地址"
      })
    }
  },
  [EventTypeEnum.ShowAlert]: ({
    subType: type,
    message,
  }: EventEnumType[EventTypeEnum.ShowAlert]) => {
    ElMessage({
      type: type as any,
      message: message as string,
    });
  },
  [EventTypeEnum.DownLoad]: async ({
    url,
    name,
    subType: type,
  }: EventEnumType[EventTypeEnum.DownLoad]) => {
    let res = await axios({
      url,
      responseType: "blob",
    });
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = name.endsWith(type) ? name : `${name}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.removeChild(link);
  },
  [EventTypeEnum.Copy]: ({ value }: EventEnumType[EventTypeEnum.Copy]) => {
   try {
    navigator.clipboard.writeText(value);
    ElMessage({
      type:"success",
      message:"复制成功"
    })
   } catch (error) {
    console.log(error,'复制失败')
    ElMessage({
      type:"error",
      message:"复制失败"
    })
   }
  },
};

export const eventSelect: SelectType[] = [
  //Event的select下拉框
  {
    value: EventTypeEnum.None,
    label: "无动作",
  },
  {
    value: EventTypeEnum.NavigateTo,
    label: "跳转",
  },
  {
    value: EventTypeEnum.DownLoad,
    label: "下载",
  },
  {
    value: EventTypeEnum.Copy,
    label: "复制",
  },
  {
    value: EventTypeEnum.ShowAlert,
    label: "消息提示",
  },
];

export const eventComponent = {
  [EventTypeEnum.None]: undefined,
  [EventTypeEnum.NavigateTo]: markRaw(NavigateTo),
  [EventTypeEnum.ShowAlert]: markRaw(ShowAlert),
  [EventTypeEnum.Copy]: markRaw(Copy),
  [EventTypeEnum.DownLoad]: markRaw(DownLoad),
};

export const navigateToSelect: SelectType[] = [
  {
    value: NavigateToOpenType.Cur,
    label: "当前窗口",
  },
  {
    value: NavigateToOpenType.New,
    label: "新窗口",
  },
];

export const ShowAlertSelect: SelectType[] = [
  {
    value: ShowAlertType.Error,
    label: "错误",
  },
  {
    value: ShowAlertType.Message,
    label: "消息",
  },
  {
    value: ShowAlertType.Success,
    label: "成功",
  },
  {
    value: ShowAlertType.Warning,
    label: "警告",
  },
];

export const DownLoadSelect: SelectType[] = [
  {
    label: DownLoadType.TXT,
    value: DownLoadType.TXT,
  },
  {
    label: DownLoadType.HTML,
    value: DownLoadType.HTML,
  },
  {
    label: DownLoadType.JSON,
    value: DownLoadType.JSON,
  },
  {
    label: DownLoadType.JPEG,
    value: DownLoadType.JPEG,
  },
  {
    label: DownLoadType.JPG,
    value: DownLoadType.JPG,
  },
  {
    label: DownLoadType.PNG,
    value: DownLoadType.PNG,
  },
  {
    label: DownLoadType.SVG,
    value: DownLoadType.SVG,
  },
];
