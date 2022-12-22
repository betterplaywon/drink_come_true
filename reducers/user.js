export const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  user: null,
  signupData: {},
  loginData: {},
  drinkCount: 0,
};

const dummyUser = {
  id: 1,
  nickname: '삼성동소주통',
  Posts: [],
  Followings: [],
  Followers: [],
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const DRINK_COUNT_UP = 'DRINK_COUNT_UP';
export const DRINK_COUNT_DOWN = 'DRINK_COUNT_DOWN';

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
    case 'LOG_IN_REQUEST':
      console.log('reducer login');
      return { ...state, isLoggingIn: true };
    case 'LOG_IN_SUCCESS':
      return { ...state, isLoggingIn: false, isLoggedIn: true, user: { ...action.data, nickname: '위스키한잔' } };
    case 'LOG_IN_FAILURE':
      return { ...state, isLoggingIn: false, isLoggedIn: true, user: action.data };
    case 'LOG_OUT_REQUEST':
      return { ...state, isLoggingOut: true };
    case 'LOG_OUT_SUCCESS':
      return { ...state, isLoggingOut: false, isLoggedIn: false, user: null };
    case 'LOG_OUT_FAILURE':
      return { ...state, isLoggingOut: false, isLoggedIn: false, user: null };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
