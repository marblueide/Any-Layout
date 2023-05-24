import { validate, Length, IsNotEmpty } from "class-validator";

export class LoginValidator {
  //@ts-ignore
  @Length(5, 15, { message: "用户名请在5-15之间" })
  //@ts-ignore
  @IsNotEmpty({
    message: "请输入用户名",
  })
  username: string;

   //@ts-ignore
  @IsNotEmpty({
    message: "请输入密码",
  })
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validate() {
    return validate(this);
  }
}
