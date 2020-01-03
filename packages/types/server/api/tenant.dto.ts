export interface ITenantDTO {
  id: number;
  userId: number;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  gender: string | null;
  phone: string | null;
  birthDate: Date | null;
  address: string | null;
}
