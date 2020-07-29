import { createAction } from 'redux-actions';
import { PostModel } from 'app/models/PostModel';

export namespace PostActions {
   export enum Type {
      FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST',
      FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
      FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE',

      CREATE_POST_REQUEST = 'CREATE_POST_REQUEST',
      CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS',
      CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
   }

   export const fetchActivity = {
      request: createAction(Type.FETCH_POSTS_REQUEST),
      success: createAction<PostModel[]>(Type.FETCH_POSTS_SUCCESS),
      failure: createAction<any>(Type.FETCH_POSTS_FAILURE)
   };

   export const createActivity = {
      request: createAction<PostModel>(Type.CREATE_POST_REQUEST),
      success: createAction(Type.CREATE_POST_SUCCESS),
      failure: createAction<any>(Type.CREATE_POST_FAILURE)
   };
}
