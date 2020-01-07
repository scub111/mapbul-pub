export interface IJournalistDTO {
  id: number;
  userId: number;
  editorId: number | null;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phone: string;
  birthDate: Date;
  address: string;
}
