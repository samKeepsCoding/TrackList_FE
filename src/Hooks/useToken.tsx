import { useState } from 'react';

const useToken = () => {
  const getToken = (): string | null => {
    const tokenString = localStorage.getItem('token');
    return tokenString !== null ? JSON.parse(tokenString) : null;
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string | null) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;