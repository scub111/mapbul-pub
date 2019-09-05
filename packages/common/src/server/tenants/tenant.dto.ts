export interface ITenantDTO {
  id: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: char(1);
  phone: string;
  birthDate: Date;
  address: string;
}