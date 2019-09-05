export interface IGuideDTO {
  id: number;
  userId: number;
  editorId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: char(1);
  phone: string;
  birthDate: Date;
  address: string;
}