import { fetchUtils } from "ra-core";
import { IFileCreateResponse, IImageMeta, IImageFormData } from "@mapbul-pub/types";
import { ImageDirs } from "@mapbul-pub/ui";
import { P } from "@mapbul-pub/utils";

const uploadEndpoint = 'upload';

const uploadFileInternal = async (apiUrl: string, file: any, meta: IImageMeta, httpClient = fetchUtils.fetchJson): Promise<IFileCreateResponse> => {
  const formData = new FormData();
  formData.append(P<IImageFormData>(p => p.file), file.rawFile);
  formData.append(P<IImageFormData>(p => p.meta), JSON.stringify(meta));

  const fileResponse = await httpClient(`${apiUrl}/${uploadEndpoint}`, {
    method: 'POST',
    body: formData,
  });
  return fileResponse.json;
};

export const uploadFile = async (apiUrl: string, data: any, fileField: string, entityField: string, erase = false): Promise<any> => {
  let meta: IImageMeta = {
    dir: ImageDirs.CategoryIcons,
  };

  if (erase)
    meta = {...meta, fileName: data[entityField]}

  if (fileField in data) {
    return {
      ...data,
      [entityField]: (await uploadFileInternal(apiUrl, data[fileField], meta)).fileName
    };
  }
  return data;
};

export const deleteFile = async (apiUrl: string, fileName: string, httpClient = fetchUtils.fetchJson): Promise<IFileCreateResponse> => {
  const meta: IImageMeta = {
    fileName
  };
  const fileResponse = await httpClient(`${apiUrl}/${uploadEndpoint}`, {
    method: 'DELETE',
    body: JSON.stringify(meta),
  });
  return fileResponse.json;
};