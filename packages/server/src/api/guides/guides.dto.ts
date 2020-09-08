import { IsDefined } from 'class-validator';
import { IGuideDTO } from '@mapbul-pub/types';

export class GuideDTO implements IGuideDTO {
  id: number;

  @IsDefined()
  userId: number;

  editorId: number | null;

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
