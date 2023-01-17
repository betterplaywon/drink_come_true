import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const GoogleLogOutButton = () => {
  const { data, status } = useSession();
  console.log('로그 아웃에서의 구글데이터: ', data);
  return (
    <>
      Signed in as {data.user.email} <br />
      <img src={data.user.image} width="150px" />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default GoogleLogOutButton;
