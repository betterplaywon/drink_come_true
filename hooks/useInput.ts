import React, { useState, useCallback, SetStateAction, Dispatch } from 'react';

type ReturnType<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];
export default <T extends string>(initValue: T): ReturnType<T> => {
  const [userInfo, setUserInfo] = useState<string>(initValue);

  const handleUserInfo = useCallback((e): void => {
    setUserInfo(e.target.value);
  }, []);

  return [userInfo, handleUserInfo, setUserInfo];
};
