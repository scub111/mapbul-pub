import { IArticleDTO } from "@mapbul-pub/types";

export class Article implements IArticleDTO {
  public static async New(init: IArticleDTO) {
    return new Article(init);
  }

  id: number;  
  title: string;
  titleEn: string;
  titlePhoto: string;
  photo: string;
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

  public constructor(init: IArticleDTO) {
    this.id = init.id;
    this.title = init.title;
    this.titleEn = init.titleEn;
    this.titlePhoto = init.titlePhoto;
    this.photo = init.photo;
    this.sourceUrl = init.sourceUrl;
    this.sourceUrlEn = init.sourceUrlEn;
    this.sourcePhoto = init.sourcePhoto;
    this.sourcePhotoEn = init.sourcePhotoEn;
    this.description = init.description;
    this.descriptionEn = init.descriptionEn;
    this.text = init.text;
    this.textEn = init.textEn;
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