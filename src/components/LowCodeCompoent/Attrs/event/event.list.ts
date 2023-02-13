import type { Component } from "vue";
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
import NavigateTo from "./component/NavigateTo.vue";
import ShowAlert from "./component/ShowAlert.vue";
import DownLoad from "./component/DownLoad.vue"
import Copy from "./component/Copy.vue"

type SelectType<T = string> = {
  value: T;
  label: string;
};

export const eventList: EventEnumType = {
  //Event的默认值
  [EventTypeEnum.NavigateTo]: {
    type: EventTypeEnum.NavigateTo,
    subType: NavigateToTypeEnum.Url,
    value: "",
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
  [EventTypeEnum.Paste]: {
    type: EventTypeEnum.Paste,
  },
  [EventTypeEnum.None]: {
    type: EventTypeEnum.None,
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
    value: EventTypeEnum.Paste,
    label: "粘贴",
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
  [EventTypeEnum.Paste]: undefined,
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

export const DownLoadSelect:SelectType[] = [
  {
    label:DownLoadType.TXT,
    value:DownLoadType.TXT,
  },
  {
    label:DownLoadType.HTML,
    value:DownLoadType.HTML
  },
  {
    label:DownLoadType.JSON,
    value:DownLoadType.JSON
  },
  {
    label:DownLoadType.JPEG,
    value:DownLoadType.JPEG
  },
  {
    label:DownLoadType.JPG,
    value:DownLoadType.JPG
  },
  {
    label:DownLoadType.PNG,
    value:DownLoadType.PNG
  },
  {
    label:DownLoadType.SVG,
    value:DownLoadType.SVG
  },
]