import { ITenantDTO } from "@mapbul-pub/types";

export class Tenant implements ITenantDTO {
  public static async New(init: ITenantDTO) {
    return new Tenant(init);
  }

  id: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phone: string;
  birthDate: Date;
  address: string;

  public constructor(init: ITenantDTO) {
    this.id = init.id;
    this.userId = init.userId;
    this.firstName = init.firstName;
    this.middleName = init.middleName;
    this.lastName = init.lastName;
    this.gender = init.gender;
    this.phone = init.phone;
    this.birthDate = init.birthDate;
    this.address = init.address;
  }
}