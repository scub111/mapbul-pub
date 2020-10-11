import api from 'services/api';
import { PostActions } from 'actions/posts';
import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { AppAction } from 'actions';

export default function* createPostSaga() {
   console.log('createPostSaga');
   yield all([fork(watchCreatePost)]);
}

export function* watchCreatePost() {
   console.log('watchCreatePost');
   yield takeLatest(PostActions.Type.CREATE_POST_REQUEST, createPostsTask);
}

export function* createPostsTask(action: AppAction) {
   console.log(action.payload);
   try {
      const t0 = new Date();
      yield call(api.postData, action.payload);
      const diff = new Date().valueOf() - t0.valueOf();
      console.log(`${diff} ms`);
      yield put(PostActions.createActivity.success());
   } catch (err) {
      yield put(PostActions.createActivity.failure(err));
   }
}
