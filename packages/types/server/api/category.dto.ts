export interface ICategoryDTO {
  id: number;
  name: string;
  enName: string | null;
  parentId: number | null;
  addedDate: Date;
  icon: string;
  color: string;
  pin: string;
  forArticle: boolean;
}
