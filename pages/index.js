import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import * as AT from '../actionType';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { mainPosts, isMorePosts, loadPostLoading } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
    dispatch({ type: AT.LOAD_POSTS_REQUEST });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        if (isMorePosts && !loadPostLoading) {
          const endId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({ type: AT.LOAD_POSTS_REQUEST, endId });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      <Head>
        <title> DRINK COME TRUE</title>
      </Head>
      {user && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
