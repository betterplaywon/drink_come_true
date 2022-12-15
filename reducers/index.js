const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signupData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

const changeName = data => {
  return {
    type: 'CHANGE_NAME',
    data,
  };
};

export const logInAction = data => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const logOutAction = data => {
  return {
    type: 'LOG_OUT',
    data,
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.data };
    case 'LOG_IN':
      return { ...state, user: { ...state.user, isLoggedIn: true, user: action.data } };
    case 'LOG_OUT':
      return { ...state, user: { ...state.user, isLoggedIn: false, user: null } };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
