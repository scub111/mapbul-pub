export interface IUserDTO {
  id: number;
  email: string;
  password: string;
  guid: string;
  userTypeId: number;
  registrationDate: Date;
  deleted: boolean;
}
