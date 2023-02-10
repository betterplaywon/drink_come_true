import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import * as AT from '../../actionType';

import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const AppLayout = dynamic(() => import('../../components/AppLayout'));
const PostCard = dynamic(() => import('../../components/PostCard'));

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector(state => state.post);

  return (
    <AppLayout>
      <PostCard post={singlePost} />
      <meta name="description" content={singlePost.content} />
      <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
      <meta property="og:description" content={singlePost.content} />
      {/* <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : ''} />
      <meta property="og:url" content={} /> */}
      <div>{`${id}가 쓴 글`}</div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: AT.LOAD_POST_REQUEST, data: context.params.id });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default Post;
