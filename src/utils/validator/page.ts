import { IsString, Length, validate } from "class-validator";

export class PageValidator {
  //@ts-ignore
  @IsString()
  id: string;

  //@ts-ignore
  @Length(5, 15)
  pageName: string;
  describe: string;
  constructor(id: string, pageName: string, describe: string) {
    this.describe = describe;
    this.pageName = pageName;
    this.id = id;
  }

  validate() {
    return validate(this);
  }
}
