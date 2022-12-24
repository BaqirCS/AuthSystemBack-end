import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  baseUrl: 'https://authsystemapi.onrender.com/api',
};
function storeReducer(state, action) {
  switch (action.type) {
    case 'LOG_IN': {
      return { ...state, userInfo: action.payload };
    }
    case 'LOG_OUT': {
      return { ...state, userInfo: null };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
