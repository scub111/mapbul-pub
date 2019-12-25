import { IJournalistDTO } from '@mapbul-pub/types';

export class Journalist implements IJournalistDTO {
  public static async New(init: IJournalistDTO) {
    return new Journalist(init);
  }

  id: number;
  userId: number;
  editorId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phone: string;
  birthDate: Date;
  address: string;

  public constructor(init: IJournalistDTO) {
    this.id = init.id;
    this.userId = init.userId;
    this.editorId = init.editorId;
    this.firstName = init.firstName;
    this.middleName = init.middleName;
    this.lastName = init.lastName;
    this.gender = init.gender;
    this.phone = init.phone;
    this.birthDate = init.birthDate;
    this.address = init.address;
  }
}
