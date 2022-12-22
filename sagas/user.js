import { put, all, fork, takeLatest, delay } from 'redux-saga/effects';

function loginAPI(data) {
  axios.post('/api/login/test', data);
}

function* login(action) {
  try {
    console.log('saga login');
    //   const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.data,
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
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', login);
}

function* watchLogout() {
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
