export const initialState = {
  isLoggedIn: false,
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

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const DRINK_COUNT_UP = 'DRINK_COUNT_UP';
export const DRINK_COUNT_DOWN = 'DRINK_COUNT_DOWN';

export const logInAction = data => {
  return {
    type: LOG_IN,
    data,
  };
};

export const logOutAction = data => {
  return {
    type: LOG_OUT,
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
    case 'LOG_IN':
      return { ...state, isLoggedIn: true, user: action.data };
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, user: null };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
