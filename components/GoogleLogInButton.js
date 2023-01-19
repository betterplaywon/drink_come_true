import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

const GoogleLogInButton = () => {
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn('goggle')}>Sign in</button>
    </>
  );
};

export default GoogleLogInButton;
