import { IFileResponse, IFileCreateResponse } from "@mapbul-pub/types";
import { IFile } from ".";

export interface IUploadService {
  write(fileName: string, file: IFile): Promise<IFileCreateResponse>;
  delete(fileName: string): Promise<IFileResponse>;
};

