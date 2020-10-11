import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';
import { createPath } from '@mapbul-pub/utils';
import { PageContent } from '@mapbul-pub/types';
import { httpClient, httpClientToken } from 'utils';
import { createUpdateData, deleteRecord } from '.';

interface IResponse<T> {
   status: number;
   headers: Headers;
   body: string;
   json: T;
}

export const daServer = (apiUrl: string): DataProvider => ({
   getList: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;

      const url = createPath({
         endpoint: `${apiUrl}/${resource}`,
         queryParams: { page, size: perPage, sort: `${field} ${order}` }
      });

      return httpClient(url).then(({ json }: IResponse<PageContent<any>>) => {
         return {
            data: json.content,
            total: json.totalElements
         };
      });
   },

   getOne: (resource, params) =>
      httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
         data: json
      })),

   getMany: (resource, params) => {
      const query = {
         id: params.ids
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url).then(({ json }: IResponse<PageContent<any>>) => {
         return { data: json.content };
      });
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
         _end: page * perPage
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
            total: parseInt(
               headers
                  ?.get('x-total-count')
                  ?.split('/')
                  .pop() || '0',
               10
            )
         };
      });
   },

   update: async (resource, params) => {
      const data = await createUpdateData(apiUrl, resource, params, true);
      return httpClientToken(`${apiUrl}/${resource}/${params.id}`, {
         method: 'PUT',
         body: JSON.stringify(data)
      }).then(({ json }) => ({ data: json }));
   },

   // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
   updateMany: (resource, params) =>
      Promise.all(
         params.ids.map((id) =>
            httpClientToken(`${apiUrl}/${resource}/${id}`, {
               method: 'PUT',
               body: JSON.stringify(params.data)
            })
         )
      ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

   create: async (resource, params) => {
      const data = await createUpdateData(apiUrl, resource, params);
      return httpClientToken(`${apiUrl}/${resource}`, {
         method: 'POST',
         body: JSON.stringify(data)
      }).then(({ json }) => ({
         data: { ...data, id: json.id }
      }));
   },

   delete: (resource, params) => {
      return deleteRecord(apiUrl, resource, params.id).then(({ json }) => ({ data: json }));
   },

   // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
   deleteMany: async (resource, params) => {
      return Promise.all(
         params.ids.map((id) => deleteRecord(apiUrl, resource, id))
      ).then((responses) => ({ data: responses.map(({ json }) => json.id) }));
      // for (const id of params.ids) {
      //   await deleteRecord(apiUrl, resource, id);
      // }
      // return Promise.resolve({ data: params.ids });
   }
});
