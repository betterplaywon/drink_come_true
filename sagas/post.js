import { all, fork, takeLatest, delay, put, call, throttle } from 'redux-saga/effects';
import * as AT from '../actionType';

import shortId from 'shortid';
import { generateDummyPost } from '../reducers/post';

function addPostAPI(data) {
  axios.post('/api/post/test', data);
}

function* addPost(action) {
  //   const result = yield call(addPostAPI, action.data);
  try {
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: AT.ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: AT.ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    yield put({
      type: AT.ADD_POST_FAILURE,
      data: error.response,
    });
  }
}

function removePostAPI(data) {
  axios.delete('/api/post/test', data);
}

function* removePost(action) {
  //   const result = yield call(addPostAPI, action.data);
  try {
    yield delay(1000);
    yield put({
      type: AT.REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: AT.REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: AT.REMOVE_POST_FAILURE,
      data: error.response,
    });
  }
}

function addCommentAPI(data) {
  axios.post(`/api/post/`, data);
}

function* addComment(action) {
  console.log(action);
  //   const result = yield call(addCommentAPI, action.data);
  try {
    const id = shortId.generate();
    yield delay(1000);
    yield put({
      type: AT.ADD_COMMENT_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: AT.ADD_COMMENT_FAILURE,
      data: error.response,
    });
  }
}

function loadPostAPI() {
  axios.get(`/api/post/load`, data);
}

function* loadPost(action) {
  // const result = yield call(loadPostAPI, action.data);
  try {
    yield delay(1000);
    yield put({
      type: AT.LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: AT.LOAD_POST_FAILURE,
      data: error.response,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(AT.ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(AT.ADD_COMMENT_REQUEST, addComment);
}

function* watchRemoveComment() {
  yield takeLatest(AT.REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPost() {
  yield throttle(5000, AT.LOAD_POST_REQUEST, loadPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemoveComment), fork(watchLoadPost)]);
}
