export interface IArticleDTO {
  id: number;
  title: string;
  titleEn: string | null;
  titlePhoto: string | null;
  photo: string | null;
  sourceUrl: string | null;
  sourceUrlEn: string | null;
  sourcePhoto: string | null;
  sourcePhotoEn: string | null;
  description: string;
  descriptionEn: string | null;
  text: string;
  textEn: string | null;
  authorId: number;
  editorId: number | null;
  addedDate: Date;
  publishedDate: Date | null;
  markerId: number | null;
  startDate: Date | null;
  startTime: Date | null;
  statusId: number;
  baseCategoryId: number;
  endDate: Date | null;
  cityId: number | null;
  titlePhotoPreview: string | null;
}
