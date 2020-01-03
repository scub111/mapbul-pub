import { ICategoryDTO } from '@mapbul-pub/types';

export class Category implements ICategoryDTO {
  public static async New(init: ICategoryDTO) {
    return new Category(init);
  }

  id: number;
  name: string;
  enName: string | null;
  parentId: number | null;
  addedDate: Date;
  icon: string;
  color: string;
  pin: string;
  forArticle: boolean;

  public constructor(init: ICategoryDTO) {
    this.id = init.id;
    this.name = init.name || '';
    this.enName = init.enName;
    this.parentId = init.parentId;
    this.addedDate = init.addedDate;
    this.icon = init.icon;
    this.color = init.color;
    this.pin = init.pin;
    this.forArticle = init.forArticle;
  }
}
