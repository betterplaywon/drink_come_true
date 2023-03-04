import React, { useState, useCallback, SetStateAction, Dispatch } from 'react';

type ReturnType<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];
export default <T extends number>(initValue: T): ReturnType<T> => {
  const [number, setNumber] = useState<number>(initValue);

  const handleplus = useCallback((): void => {
    setNumber((prev: number) => prev + 1);
  }, []);

  return [number, handleplus];
};
