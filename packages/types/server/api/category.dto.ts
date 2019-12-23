export interface ICategoryDTO {
  id: number;
  name: string;
  enName: string;
  parentId: number;
  addedDate: Date;
  icon: string;
  color: string;
  pin: string;
  forArticle: boolean;
}
