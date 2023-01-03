import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

import * as AT from '../actionType';

export const initialState = {
  mainPosts: [],
  imagePaths: [],

  isMorePosts: true,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
};

// export const generateDummyPost = number =>
//   Array(number)
//     .fill()
//     .map(() => ({
//       id: shortId.generate(),
//       User: {
//         id: shortId.generate(),
//         name: faker.name.findName(),
//       },
//       content: faker.lorem.paragraph(),
//       Images: [
//         {
//           src: faker.image.sports(),
//         },
//       ],
//       Comments: [
//         {
//           User: {
//             id: shortId.generate(),
//             name: faker.name.findName(),
//           },
//           content: faker.lorem.sentence(),
//         },
//       ],
//     }));

export const addPost = data => ({
  type: AT.ADD_POST_REQUEST,
  data,
});

export const addComment = data => ({
  type: AT.ADD_COMMENT_REQUEST,
  data,
});

// const dummyPost = data => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     name: '소주소주소주수조소주',
//   },
//   Images: [],
//   Comments: [],
// });

// const dummyComment = data => ({
//   id: shortId.generate(),
//   content: data,
//   User: {
//     id: 1,
//     name: '그라가스',
//   },
// });

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AT.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case AT.ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case AT.ADD_POST_FAILURE:
        draft.addPostLoading = false;
        addPostError = action.error;
        break;
      case AT.LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case AT.LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.isMorePosts = draft.mainPosts.length < 40;
        break;
      case AT.LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        loadPostError = action.error;
        break;
      case AT.REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case AT.REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(f => f.id !== action.data.PostId);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case AT.REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case AT.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case AT.ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(x => x.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case AT.ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      case AT.LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case AT.LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        const post = draft.mainPosts.find(m => m.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        break;
      }
      case AT.LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case AT.UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case AT.UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        const post = draft.mainPosts.find(m => m.id === action.data.PostId);
        post.likers = post.Likers.filter(m => m.id !== action.data.UserId);
        break;
      }
      case AT.UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
