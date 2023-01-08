import { all, fork, takeLatest, delay, put, call, throttle } from 'redux-saga/effects';
import * as AT from '../actionType';
import axios from 'axios';

// import shortId from 'shortid';
// import { generateDummyPost } from '../reducers/post';

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: AT.ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: AT.ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: AT.REMOVE_POST_SUCCESS,
      data: result.data,
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
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  console.log(action);
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: AT.ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: AT.ADD_COMMENT_FAILURE,
      data: error.response,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: AT.LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.LOAD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function loadPostsAPI(endId) {
  return axios.get(`/posts?endId=${endId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.endId);
    yield put({
      type: AT.LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AT.LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: AT.LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.LIKE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: AT.UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.UNLIKE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function imageUploadAPI(data) {
  return axios.post('/post/images', data);
}

function* imageUpload(action) {
  try {
    const result = yield call(imageUploadAPI, action.data);
    yield put({
      type: AT.IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.IMAGE_UPLOAD_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(AT.ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(AT.ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(AT.REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPost() {
  yield takeLatest(AT.LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield throttle(5000, AT.LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLikePost() {
  yield takeLatest(AT.LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() {
  yield takeLatest(AT.UNLIKE_POST_REQUEST, unLikePost);
}

function* watchImageUpload() {
  yield takeLatest(AT.IMAGE_UPLOAD_REQUEST, imageUpload);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchImageUpload),
  ]);
}
