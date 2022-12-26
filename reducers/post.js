export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        name: 'kkk',
      },
      content: 'asd',
      Images: [
        {
          src: 'http://cdn.shopify.com/s/files/1/0455/4725/8023/products/HKB_1200x1200.png?v=1655701347',
        },
        {
          src: 'https://cdn.shopify.com/s/files/1/0271/6401/6717/products/mosa_grape_web1_1080x.jpg?v=1650656256',
        },
        {
          src: 'https://cdn.shopify.com/s/files/1/0630/7627/0299/articles/Real_English_Product_Crops_8_1445x.jpg?v=1655198323',
        },
        {
          src: 'https://sc04.alicdn.com/kf/A9aa6dea3c8c54b2d930e94c2388be3b1p.jpeg',
        },
        {
          src: 'https://beerhunter.co.uk/wp-content/uploads/2020/04/ERDINGER-500ml.png',
        },
      ],
      Comments: [
        {
          User: {
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
  content: data,
  User: {
    id: 1,
    name: '소주소주소주수조소주',
  },
  Images: [],
  Comments: [],
});

const dummyComment = data => ({
  id: 1,
  content: data,
  User: {
    id: 1,
    name: '그라가스',
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return { ...state, addPostLoading: false, addPostError: action.error };
    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS:
      const postIdx = state.mainPosts.findIndex(x => x.id === action.data.postId);
      const post = { ...state.mainPosts[postIdx] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIdx] = post;
      return { ...state, mainPosts, addCommentLoading: false, addCommentDone: true };
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentError: action.error };
    default:
      return state;
  }
};

export default reducer;
