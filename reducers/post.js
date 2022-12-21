export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        name: 'kkk',
      },
      content: '술술술 #소주 #맥주 #알딸딸',
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
