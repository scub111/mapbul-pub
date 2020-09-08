import { IsDefined } from 'class-validator';
import { IArticleDTO } from '@mapbul-pub/types';

export class ArticleDTO implements IArticleDTO {
  id: number;

  @IsDefined()
  title: string;

  titleEn: string | null;

  titlePhoto: string | null;

  photo: string | null;

  sourceUrl: string | null;

  sourceUrlEn: string | null;

  sourcePhoto: string | null;

  sourcePhotoEn: string | null;

  @IsDefined()
  description: string;

  descriptionEn: string | null;

  @IsDefined()
  text: string;

  textEn: string | null;

  @IsDefined()
  authorId: number;

  editorId: number | null;

  @IsDefined()
  addedDate: Date;

  publishedDate: Date | null;

  markerId: number | null;

  startDate: Date | null;

  startTime: Date | null;

  @IsDefined()
  statusId: number;

  @IsDefined()
  baseCategoryId: number;

  endDate: Date | null;

  cityId: number | null;

  titlePhotoPreview: string | null;

  titlePhotoOriginal: string | null;

  photoOriginal: string | null;
}
