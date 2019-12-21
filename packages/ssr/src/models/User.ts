import { IUserDTO } from "@mapbul-pub/types";

export class User implements IUserDTO {
  public static async New(init: IUserDTO) {
    return new User(init);
  }

  id: number;
  email: string;
  password: string;
  guid: string;
  userTypeId: number;
  registrationDate: Date;
  deleted: boolean;

  public constructor(init: IUserDTO) {
    this.id = init.id;
    this.email = init.email;
    this.password = init.password;
    this.guid = init.guid;
    this.userTypeId = init.userTypeId;
    this.registrationDate = init.registrationDate
    this.deleted = init.deleted;
  }
}