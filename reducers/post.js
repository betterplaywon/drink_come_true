export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        name: 'kkk',
      },
      content: '술술술',
      Images: [{ src: '' }, { src: '' }, { src: '' }],
      Comments: [
        {
          User: {
            name: 'qwerasdf',
          },
          content: '이모 여기 소주 한병 추가요',
        },
        {
          User: {
            name: '궁온이요',
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
  User: {
    id: 1,
    name: 'kkk',
  },
  content: '꼴꼴꼴꼴꼴꼴꼴',
  Images: [{ src: '' }, { src: '' }, { src: '' }],
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
