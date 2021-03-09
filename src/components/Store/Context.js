import { createContext } from 'react';

const StoreContext = createContext({
  idC: null,
  setIdC: () => {},
  loginC: null,
  setLoginC: () => {},
  token: null,
  setToken: () => {},
});

export default StoreContext;
