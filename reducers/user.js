export const initialState = {
  isLoggedIn: false,
  user: null,
  signupData: {},
  loginData: {},
};

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

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
