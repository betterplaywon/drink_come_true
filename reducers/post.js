import shortId from 'shortid';
import produce from 'immer';
import { REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE } from '../actionType';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: shortId.generate(),
        name: 'kkk',
      },
      content: 'asd',
      Images: [
        {
          id: shortId.generate(),
          src: 'http://cdn.shopify.com/s/files/1/0455/4725/8023/products/HKB_1200x1200.png?v=1655701347',
        },
        {
          id: shortId.generate(),
          src: 'https://cdn.shopify.com/s/files/1/0271/6401/6717/products/mosa_grape_web1_1080x.jpg?v=1650656256',
        },
        {
          id: shortId.generate(),
          src: 'https://cdn.shopify.com/s/files/1/0630/7627/0299/articles/Real_English_Product_Crops_8_1445x.jpg?v=1655198323',
        },
        {
          id: shortId.generate(),
          src: 'https://sc04.alicdn.com/kf/A9aa6dea3c8c54b2d930e94c2388be3b1p.jpeg',
        },
        {
          id: shortId.generate(),
          src: 'https://beerhunter.co.uk/wp-content/uploads/2020/04/ERDINGER-500ml.png',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            name: '궁온이요',
          },
          content: '불러온 데이터 2',
        },
      ],
    },
  ],
  postSuccess: false,
  imagePaths: [],

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    name: '소주소주소주수조소주',
  },
  Images: [],
  Comments: [],
});

const dummyComment = data => ({
  id: shortId.generate(),
  content: data.content,
  User: {
    id: 1,
    name: '그라가스',
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(f => f.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.findIndex(x => x.id === action.data.postId);
        post.Comments = post.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
