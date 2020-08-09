import { PostModel } from 'models/PostModel';

export interface PostReducerModel {
   items: PostModel[];
   item: PostModel;
   isFetching: boolean;
   error: any
}

export namespace RootState {
  export type PostsState = PostReducerModel;
}
