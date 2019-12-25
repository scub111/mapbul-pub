import { IUserTypeDTO } from '@mapbul-pub/types';

export class UserType implements IUserTypeDTO {
  public static async New(init: IUserTypeDTO) {
    return new UserType(init);
  }

  id: number;
  tag: string;
  description: string;

  public constructor(init: IUserTypeDTO) {
    this.id = init.id;
    this.tag = init.tag;
    this.description = init.description;
  }
}
