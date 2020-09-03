export type ImageDirsType = 'ArticlePhotos' | 'CategoryIcons' | 'MarkerPhotos';

export const ImageDirs: { [key in ImageDirsType]: ImageDirsType } = {
  ArticlePhotos: 'ArticlePhotos',
  CategoryIcons: 'CategoryIcons',
  MarkerPhotos: 'MarkerPhotos',
};
