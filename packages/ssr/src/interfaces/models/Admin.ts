import { IAdminDTO } from "@mapbul-pub/types";

export class Admin implements IAdminDTO {
  public static async New(init: IAdminDTO) {
    return new Admin(init);
  }

  id: number;
  userId: number;
  superuser: boolean;

  public constructor(init: IAdminDTO) {
    this.id = init.id;
    this.userId = init.userId;
    this.superuser = init.superuser;
  }
}