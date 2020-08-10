import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';
import { Routes, ImageDirs, ImageDirsType } from '@mapbul-pub/ui';
import { createPath, P } from '@mapbul-pub/utils';
import { PageContent, IImageFormData, IImageMeta, IImageResponse, ICategoryDTO } from '@mapbul-pub/types';

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 *
 * @example
 *
 * getList          => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * getOne           => GET http://my.api.url/posts/123
 * getManyReference => GET http://my.api.url/posts?author_id=345
 * getMany          => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * create           => POST http://my.api.url/posts/123
 * update           => PUT http://my.api.url/posts/123
 * updateMany       => PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
 * delete           => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import jsonServerProvider from 'ra-data-json-server';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={jsonServerProvider('http://jsonplaceholder.typicode.com')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */

interface IResponse<T> {
  status: number;
  headers: Headers;
  body: string;
  json: T;
};

const uploadEndpoint = 'upload';

export const uploadImage = async (apiUrl: string, file: any, httpClient = fetchUtils.fetchJson): Promise<IImageResponse> => {
  const meta: IImageMeta = {
    dir: ImageDirs.CategoryIcons,
  };

  const formData = new FormData();
  formData.append(P<IImageFormData>(p => p.file), file.rawFile);
  formData.append(P<IImageFormData>(p => p.meta), JSON.stringify(meta));

  const fileResponse = await httpClient(`${apiUrl}/${uploadEndpoint}`, {
    method: 'POST',
    body: formData,
  });
  return fileResponse.json;
};

export default (apiUrl: string, httpClient = fetchUtils.fetchJson): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const url = createPath({
      endpoint: `${apiUrl}/${resource}`,
      queryParams: { page, size: perPage, sort: `${field} ${order}` },
    });

    return httpClient(url).then(({ json }: IResponse<PageContent<any>>) => {
      return {
        data: json.content,
        total: json.totalElements,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }: IResponse<PageContent<any>>) => { return { data: json.content } });
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has('x-total-count')) {
        throw new Error(
          'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
        );
      }
      return {
        data: json,
        total: parseInt((headers?.get('x-total-count')?.split('/').pop()) || "0", 10),
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

  create: async (resource, params) => {
    console.log(111, params.data);
    let data = params.data;

    if (resource === Routes.categories) {
      if (P<ICategoryDTO>(p => p.icon) in data) {
        data = { 
          ...data, 
          icon: (await uploadImage(apiUrl, data.icon)).fileName 
        };
      }
      if (P<ICategoryDTO>(p => p.pin) in data) {
        data = { 
          ...data, 
          pin: (await uploadImage(apiUrl, data.pin)).fileName 
        };
      }
    }

    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(({ json }) => ({
      data: { ...data, id: json.id },
    }))
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
});
