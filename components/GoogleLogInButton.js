import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

const GoogleLogInButton = () => {
  // const handleGoogleSignIn = () => {
  //   signIn('goggle');
  // };

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn('goggle')}>Sign in</button>
    </>
  );
};

export default GoogleLogInButton;
