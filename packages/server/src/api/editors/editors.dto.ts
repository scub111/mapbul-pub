import { IsDefined } from 'class-validator';
import { IEditorDTO } from '@mapbul-pub/types';

export class EditorDTO implements IEditorDTO {
  id: number;

  @IsDefined()
  userId: number;

  @IsDefined()
  firstName: string;

  @IsDefined()
  middleName: string;

  @IsDefined()
  lastName: string;

  @IsDefined()
  gender: string;

  @IsDefined()
  phone: string;

  @IsDefined()
  birthDate: Date;

  @IsDefined()
  address: string;
}
