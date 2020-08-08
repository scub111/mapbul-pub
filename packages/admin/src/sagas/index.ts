import fetchPostsSaga from 'sagas/fetchPosts';
import { all, fork } from 'redux-saga/effects';
import createPostSaga from 'sagas/createPost';

export default function* rootSaga() {
   yield all ([
      fork(fetchPostsSaga),
      fork(createPostSaga)
   ])
}