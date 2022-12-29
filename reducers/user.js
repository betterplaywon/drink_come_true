import produce from 'immer';

import * as AT from '../actionType';

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

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  user: null,
  signupData: {},
  loginData: {},
};

export const loginRequestAction = data => ({
  type: AT.LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: AT.LOG_OUT_REQUEST,
});

export const signupRequestAction = data => ({
  type: AT.SIGN_UP_REQUEST,
  data,
});

const dummyUser = data => ({
  ...data,
  id: 1,
  name: '삼성동소주통',
  Posts: [{ id: 1 }],
  Followings: [{ nickname: '오늘의 술' }, { nickname: '혼술족' }, { nickname: '족발에 소주 딱임' }],
  Followers: [{ nickname: '팔로워 첫번째' }, { nickname: '팔로워 두번째' }, { nickname: '팔로워 세번째' }],
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AT.LOG_IN_REQUEST:
        console.log('reducer login');
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case AT.LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.user = dummyUser(action.data);
        break;
      case AT.LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case AT.LOG_OUT_REQUEST:
        console.log('reducer logout');
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case AT.LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break;
      case AT.LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = true;

        break;
      case AT.SIGN_UP_REQUEST:
        draft.signupLoading = true;
        drat.signupDone = false;
        draft.signupError = null;
        break;
      case AT.SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case AT.SIGN_UP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = true;
        break;
      case AT.ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data });
        break;
      case AT.REMOVE_POST_OF_ME:
        draft.user.Posts = draft.user.Posts.filter(f => f.id !== action.data);
        break;

      //  ------------------- FOLLOW REDUCER -------------------

      case AT.FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case AT.FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.user.Followings.push({ id: action.data });
        break;
      case AT.FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      case AT.UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case AT.UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.user.Followings = draft.user.Followings.filter(m => m.id !== action.data);
        break;
      case AT.UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
