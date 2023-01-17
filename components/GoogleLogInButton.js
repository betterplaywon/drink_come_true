import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

const GoogleLogInButton = () => {
  const { data, status } = useSession();
  console.log('로그인에서의 구글데이터: ', data);
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn('goggle')}>Sign in</button>
    </>
  );
};

export default GoogleLogInButton;
