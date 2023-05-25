import { IsString, Length, validate } from "class-validator";

export type RouterValidator = {
  name: string;
  path: string;
  userGroup: string[];
};
