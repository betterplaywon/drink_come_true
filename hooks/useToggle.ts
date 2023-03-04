import React, { useState, useCallback, SetStateAction, Dispatch } from 'react';

type ReturnType<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];
export default <T extends boolean>(initValue: T): ReturnType<T> => {
  const [toggle, setToggle] = useState<boolean>(initValue);

  const handleToggle = useCallback((): void => {
    setToggle((prev) => !prev);
  }, []);

  return [toggle, handleToggle];
};
