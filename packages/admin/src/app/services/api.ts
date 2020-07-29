import axios from 'axios';
import { PostModel } from 'app/models/PostModel';

const API_ROOT = 'https://jsonplaceholder.typicode.com';

const enum MethodType {
   GET = 'GET',
   POST = 'POST',
   DELETE = 'DELETE',
   PUT = 'PUT'
}

const callApi = async (
   endpoint: string = '',
   method: MethodType = MethodType.GET,
   data: any = null/* , schema, request */
) => {
   return await axios({
      url: API_ROOT + endpoint,
      method,
      data
   });
}

export default {
   async getData() {
      const response = await callApi('/posts');
      return response.data;
   },
   async postData(data: PostModel): Promise<any> {
      const response = await callApi('/posts', MethodType.POST, data);
      return response.data;
   },
}
