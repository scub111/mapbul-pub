import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';
import { Routes } from '@mapbul-pub/ui';
import { createPath, P, Mutex } from '@mapbul-pub/utils';
import { PageContent } from '@mapbul-pub/types';
import { uploadFile, deleteFile, httpClient, httpClientToken } from 'utils';
import { ICategoryDTOEx } from 'interfaces';

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

const deleteRecord = async (apiUrl: string, resource: string, id: string | number) => {
  const response = await httpClientToken(`${apiUrl}/${resource}/${id}`, {
    method: 'DELETE',
  });
  if (resource === Routes.categories) {
    // const data = params.previousData as ICategoryDTOEx;
    const data = response.json as ICategoryDTOEx;
    await deleteFile(apiUrl, data.icon);
    await deleteFile(apiUrl, data.pin);
  }
  return response;
}

const mutex = new Mutex();

export default (apiUrl: string): DataProvider => ({
  getList: async (resource, params) => {
    const unloack = await mutex.lock();

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const url = createPath({
      endpoint: `${apiUrl}/${resource}`,
      queryParams: { page, size: perPage, sort: `${field} ${order}` },
    });

    unloack();

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

  update: async (resource, params) => {
    let data = params.data;

    if (resource === Routes.categories) {
      data = await uploadFile(apiUrl, data, P<ICategoryDTOEx>(p => p.iconFile), P<ICategoryDTOEx>(p => p.icon), true);
      data = await uploadFile(apiUrl, data, P<ICategoryDTOEx>(p => p.pinFile), P<ICategoryDTOEx>(p => p.pin), true);
    }

    return httpClientToken(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(({ json }) => ({ data: json }))
  },

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClientToken(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

  create: async (resource, params) => {
    let data = params.data;

    if (resource === Routes.categories) {
      data = await uploadFile(apiUrl, data, P<ICategoryDTOEx>(p => p.iconFile), P<ICategoryDTOEx>(p => p.icon));
      data = await uploadFile(apiUrl, data, P<ICategoryDTOEx>(p => p.pinFile), P<ICategoryDTOEx>(p => p.pin));
    }

    return httpClientToken(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(({ json }) => ({
      data: { ...data, id: json.id },
    }))
  },

  delete: (resource, params) => {
    return deleteRecord(apiUrl, resource, params.id)
      .then(({ json }) => ({ data: json }));
  },

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: async (resource, params) => {
    return Promise.all(
      params.ids.map(id =>
        deleteRecord(apiUrl, resource, id)
      )
    )
    .then(responses => ({ data: responses.map(({ json }) => json.id) }))
    // for (const id of params.ids) {
    //   await deleteRecord(apiUrl, resource, id);
    // }
    // return Promise.resolve({ data: params.ids });
  },
});
