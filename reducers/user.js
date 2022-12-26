import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  DRINK_COUNT_UP,
  DRINK_COUNT_DOWN,
} from '../actionType';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  signupLoading: false,
  signupDone: false,
  signupError: null,

  user: null,
  signupData: {},
  loginData: {},
  drinkCount: 0,
};

const dummyUser = data => ({
  ...data,
  id: 1,
  nickname: '삼성동소주통',
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = data => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  };
};

export const signupRequestAction = data => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const drinkCoiuntUpAction = data => {
  return {
    type: DRINK_COUNT_UP,
    data,
  };
};

export const drinkCoiuntDownAction = data => {
  return {
    type: DRINK_COUNT_DOWN,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      console.log('reducer login');
      return { ...state, logInLoading: true, logInDone: false, logInError: null };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        user: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return { ...state, logInLoading: false, logInError: action.error };
    case LOG_OUT_REQUEST:
      console.log('reducer logout');
      return { ...state, logOutLoading: true, logOutDone: false, logOutError: null };
    case LOG_OUT_SUCCESS:
      return { ...state, logOutLoading: false, logOutDone: true };
    case LOG_OUT_FAILURE:
      return { ...state, logOutLoading: false, logOutError: true };
    case SIGN_UP_REQUEST:
      return { ...state, signupLoading: true, signupDone: false, signupError: null };
    case SIGN_UP_SUCCESS:
      return { ...state, signupLoading: false, signupDone: true };
    case SIGN_UP_FAILURE:
      return { ...state, signupLoading: false, signupError: true };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
