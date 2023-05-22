import { validate, Length } from "class-validator";

export class LoginValidator {
  //@ts-ignore
  @Length(5, 15)
  username: string;

  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validate() {
    return validate(this);
  }
}
