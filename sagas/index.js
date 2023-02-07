import { all, fork, takeLatest } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
