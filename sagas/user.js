import { put, all, fork, takeLatest, delay } from 'redux-saga/effects';
import * as AT from '../actionType';

function loginAPI(data) {
  axios.post('/api/login/test', data);
}

function* login(action) {
  try {
    console.log('saga login');
    //   const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: AT.LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: AT.LOG_IN_FAILURE,
      error: error.response,
    });
  }
}

function logoutAPI() {
  axios.post('/api/logout/test');
}

function* logout() {
  //   const result = yield call(logoutAPI);
  yield delay(1000);
  try {
    yield put({
      type: AT.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AT.LOG_OUT_FAILURE,
      error: error.response,
    });
  }
}

function signupAPI() {
  axios.post('/api/post/signup');
}

function* signup() {
  // const result = yield call(signupAPI);
  yield delay(1000);

  try {
    yield put({
      type: AT.SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: AT.SIGN_UP_FAILURE,
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

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}
