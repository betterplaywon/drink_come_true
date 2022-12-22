import { all, fork, takeLatest } from 'redux-saga/effects';

function addPostAPI(data) {
  axios.post('/api/addpost/test', data);
}

function* addPost(action) {
  //   const result = yield call(addPostAPI, action.data);
  yield delay(1000);
  try {
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST', addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
