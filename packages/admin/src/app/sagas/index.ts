import fetchPostsSaga from 'app/sagas/fetchPosts';
import { all, fork } from 'redux-saga/effects';
import createPostSaga from 'app/sagas/createPost';

export default function* rootSaga() {
   yield all ([
      fork(fetchPostsSaga),
      fork(createPostSaga)
   ])
}