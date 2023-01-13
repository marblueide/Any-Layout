export interface DataAnimation {
  label: string;
  value: string;
  dealy: number;
  time: number;
  isLoop: boolean;
}

export interface DataLinkage {
  id: string;
  event: string;
  style: {
    key: string;
    value: number | string;
  };
}
