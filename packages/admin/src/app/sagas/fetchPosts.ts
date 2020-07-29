import api from 'app/services/api';
import { PostActions } from 'app/actions/posts';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { PostModel } from 'app/models/PostModel';

export default function* fetchPostsSaga() {
   console.log('postsSaga');
   yield all([
      fork(watchFetchPosts),
   ]);
}

export function* watchFetchPosts() {
   console.log('watchFetchPosts');
   yield takeEvery(PostActions.Type.FETCH_POSTS_REQUEST, fetchPostsTask);
}


export function* fetchPostsTask() {
   try {
      const payload = yield call(api.getData);
      // yield put(PostActions.fetchPostsSuccess(payload));
      yield put(PostActions.fetchActivity.success(payload));
   } catch (err) {
      // yield put(PostActions.fetchPostsFailure(err.message));
      yield put(PostActions.fetchActivity.failure(err));
   }
}

