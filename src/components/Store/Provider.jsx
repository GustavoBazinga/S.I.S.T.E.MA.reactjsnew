import React from 'react';
import Context from './Context';
import useStorage from 'utils/useStorage';

const StoreProvider = ({ children }) => {
  const [idC, setIdC] = useStorage('id')
  const [loginC, setLoginC] = useStorage('login')
  const [token, setToken] = useStorage('token');

  return (
    <Context.Provider
      value={{
        idC,
        setIdC,
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
