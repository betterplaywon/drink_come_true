import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Card } from 'antd';

import * as AT from '../actionType';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

const introduce = () => {
  const dispatch = useDispatch();
  const { anotherUser } = useSelector(state => state.user);
  console.log({ anotherUser });
  return (
    <AppLayout>
      <Head>
        <title>getStaticProps 테스트 페이지</title>
      </Head>

      {/* 서버에서 anotherUser의 user 정보를 length만 내려주도록 처리해준 상태 */}
      {anotherUser ? (
        <Card
          actions={[
            <div>
              정적임
              <br />
              {anotherUser.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {anotherUser.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {anotherUser.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{anotherUser.nickname[0]}</Avatar>}
            title={anotherUser.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async context => {
  context.store.dispatch({
    type: AT.LOAD_ANOTHER_USER_INFO_REQUEST,
    data: 1, // 내 데이터를 1로 가정해봤을 시
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
export default introduce;
