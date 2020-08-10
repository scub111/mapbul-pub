export interface IImageMeta {
  dir?: string;
}

export interface IImageFormData {
  file?: any;
  meta?: IImageMeta;
}

export interface IImageResponse {
  fileName: string;
  size: number;
}
