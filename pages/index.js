import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  return (
    <AppLayout>
      <Head>
        <title> DRINK COME TRUE</title>
      </Head>
      {isLoggedIn && <PostForm />}
      {mainPosts.map(post => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </AppLayout>
  );
};

export default Home;
