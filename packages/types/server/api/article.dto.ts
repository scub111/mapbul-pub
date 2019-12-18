export interface IArticleDTO {
  id: number;
  title: string;
  titleEn: string;
  titlePhoto: string | null;
  photo: string | null;
  sourceUrl: string;
  sourceUrlEn: string;
  sourcePhoto: string;
  sourcePhotoEn: string;
  description: string;
  descriptionEn: string;
  text: string;
  textEn: string;
  authorId: number;
  editorId: number;
  addedDate: Date;
  publishedDate: Date;
  markerId: number;
  startDate: Date;
  startTime: Date;
  statusId: number;
  baseCategoryId: number;
  endDate: Date;
  cityId: number;
}
