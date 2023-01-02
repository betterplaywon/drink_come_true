import { put, all, fork, takeLatest, delay, call } from 'redux-saga/effects';
import * as AT from '../actionType';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: AT.LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: AT.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AT.LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function signupAPI(data) {
  return axios.post('/user', data);
}

function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log(result);
    yield put({
      type: AT.SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AT.SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function followAPI(data) {
  return axios.post(`/user/${data}/follow`);
}

function* follow(action) {
  // const result = yield call(followAPI);
  try {
    yield delay(1000);
    yield put({
      type: AT.FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: AT.FOLLOW_FAILURE,
      error: error.response,
    });
  }
}

function unfollowAPI() {
  return axios.post('/api/unfollow');
}

function* unfollow(action) {
  // const result = yield call(unfollowAPI);

  try {
    yield delay(1000);
    yield put({
      type: AT.UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: AT.UNFOLLOW_FAILURE,
      error: error.response,
    });
  }
}

function* watchLogin() {
  yield takeLatest(AT.LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(AT.LOG_OUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(AT.SIGN_UP_REQUEST, signup);
}

function* watchFollow() {
  yield takeLatest(AT.FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(AT.UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup), fork(watchFollow), fork(watchUnfollow)]);
}
