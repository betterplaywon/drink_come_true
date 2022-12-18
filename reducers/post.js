export const initialState = {
  mainPosts: [
    {
      id: 1,
      user: {
        id: 1,
        nickname: 'kkk',
      },
      content: '술술술',
      Images: [{}],
      Comments: [
        {
          User: {
            nickname: 'qwerasdf',
          },
          content: '이모 여기 소주 한병 추가요',
        },
        {
          User: {
            nickname: '궁온이요',
          },
          content: '밀크시슬 복용 필요',
        },
      ],
    },
  ],
  postSuccess: false,
  imagePaths: [],
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  user: {
    id: 1,
    nickname: 'kkk',
  },
  content: '꼴꼴꼴꼴꼴꼴꼴',
  Images: [{}],
  Comments: [],
  postSuccess: false,
  imagePaths: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, mainPosts: [dummyPost, ...state.mainPosts] };

    default:
      return state;
  }
};

export default reducer;
