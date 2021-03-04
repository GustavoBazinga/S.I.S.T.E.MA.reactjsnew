import React from 'react';
import Context from './Context';
import useStorage from 'utils/useStorage';

const StoreProvider = ({ children }) => {
  const [loginC, setLoginC] = useStorage('login')
  const [token, setToken] = useStorage('token');

  return (
    <Context.Provider
      value={{
        loginC,
        setLoginC,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}


export default StoreProvider;
