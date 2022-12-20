export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        name: 'kkk',
      },
      content: '술술술',
      Images: [
        {
          src: 'http://img.segye.com/content/image/2020/01/03/20200103511019.jpg',
        },
        {
          src: 'https://src.hidoc.co.kr/image/lib/2021/8/31/1630399518095_0.jpg',
        },
        {
          src: 'http://ojsfile.ohmynews.com/STD_IMG_FILE/2022/0407/IE002968224_STD.jpg',
        },
      ],
      Comments: [
        {
          User: {
            name: 'qwerasdf',
          },
          content: '불러온 데이터 1',
        },
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
  content: '술 좀 그만마셔',
  Images: [],
  Comments: [
    {
      User: {
        name: 'poiu',
      },
      content: '이모 여기 소주 한병 추가요',
    },
    {
      User: {
        name: 'lkjh',
      },
      content: '오늘 집 못가',
    },
  ],
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
