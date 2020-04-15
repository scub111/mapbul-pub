import { IArticleDTO } from '@mapbul-pub/types';
import { clearUrl } from 'utils';
import { IMAGE_URL } from 'common/constants';
import { Category } from '.';
import { UserDescription } from 'interfaces';
import { GlobalVar } from '../config';

export class Article implements IArticleDTO {
  public static async New(init: IArticleDTO, category?: Category, userDescription?: UserDescription) {
    const newArticle = new Article(init);
    newArticle.category = category;
    newArticle.userDescription = userDescription;
    return newArticle;
  }

  id: number;
  title: string;
  titleEn: string | null;
  titleLang: string | null;
  titlePhoto: string | null;
  photo: string | null;
  sourceUrl: string | null;
  sourceUrlEn: string | null;
  sourceUrlLang: string | null;
  sourcePhoto: string | null;
  sourcePhotoEn: string | null;
  sourcePhotoLang: string | null;
  description: string;
  descriptionEn: string | null;
  descriptionLang: string | null;
  text: string;
  textEn: string | null;
  textLang: string | null;
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

  category: Category | undefined;
  userDescription: UserDescription | undefined;

  public constructor(init: IArticleDTO) {
    this.id = init.id;
    this.title = init.title;
    this.titleEn = init.titleEn;
    this.titleLang = GlobalVar.isRus ? init.title : init.titleEn;
    this.titlePhoto = init.titlePhoto ? clearUrl(`${IMAGE_URL}/${init.titlePhoto}`) : null;
    this.photo = init.photo ? clearUrl(`${IMAGE_URL}/${init.photo}`) : null;
    this.sourceUrl = init.sourceUrl;
    this.sourceUrlEn = init.sourceUrlEn;
    this.sourceUrlLang = GlobalVar.isRus ? init.sourceUrl : init.sourceUrlEn;
    this.sourcePhoto = init.sourcePhoto;
    this.sourcePhotoEn = init.sourcePhotoEn;
    this.sourcePhotoLang = GlobalVar.isRus ? init.sourcePhoto : init.sourcePhotoEn;
    this.description = init.description;
    this.descriptionEn = init.descriptionEn;
    this.descriptionLang = GlobalVar.isRus ? init.description : init.descriptionEn;
    this.text = init.text;
    this.textEn = init.textEn;
    this.textLang = GlobalVar.isRus ? init.text : init.textEn;
    this.authorId = init.authorId;
    this.editorId = init.editorId;
    this.addedDate = init.addedDate;
    this.publishedDate = init.publishedDate;
    this.markerId = init.markerId;
    this.startDate = init.startDate;
    this.startTime = init.startTime;
    this.statusId = init.statusId;
    this.baseCategoryId = init.baseCategoryId;
    this.endDate = init.endDate;
    this.cityId = init.cityId;
  }
}
