export interface IImageMeta {
  dir?: string;
  fileName?: string;
}

export interface IImageFormData {
  file?: any;
  meta?: IImageMeta;
}

export interface IFileResponse {
  fileName: string;
};

export interface IFileCreateResponse extends IFileResponse {
  size: number;
};