export enum EventTypeEnum {
  None = "none",
  NavigateTo = "navigateTo",
  ShowAlert = "showAlert",
  DownLoad = "downLoad",
  Copy = "copy",
}

export enum EventEnum {
  onClick = "onClick",
  onChange = "onChange",
  onInput = "onInput",
}

export enum NavigateToTypeEnum {
  Page = "page",
  Url = "url",
}

export enum NavigateToOpenType {
  Cur = "cur",
  New = "new",
}

export enum ShowAlertType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Message = "message",
  none = "none",
}

export enum DownLoadType {
  TXT = 'TXT',
  HTML = 'HTML',
  JSON = 'JSON',
  JPEG = 'JPEG',
  JPG = 'JPG',
  PNG = 'PNG',
  SVG = 'SVG'
}

export type EventEnumType = {
  [EventTypeEnum.NavigateTo]: {
    type: EventTypeEnum.NavigateTo;
    subType: NavigateToTypeEnum;
    url: string;
    target: NavigateToOpenType;
  };
  [EventTypeEnum.ShowAlert]: {
    type: EventTypeEnum.ShowAlert;
    subType: ShowAlertType;
    message: string;
  };
  [EventTypeEnum.DownLoad]: {
    type: EventTypeEnum.DownLoad;
    subType: string;
    url: string;
    name: string;
  };
  [EventTypeEnum.Copy]: {
    type: EventTypeEnum.Copy;
    value: string;
  }
  [EventTypeEnum.None]: {
    type: EventTypeEnum.None;
  };
};

export type EventEnumTypeOption =
  | EventEnumType[EventTypeEnum.NavigateTo]
  | EventEnumType[EventTypeEnum.ShowAlert]
  | EventEnumType[EventTypeEnum.DownLoad]
  | EventEnumType[EventTypeEnum.Copy]
  | EventEnumType[EventTypeEnum.None];

export type EventType = {
  [k in EventEnum]?: EventEnumTypeOption;
};
