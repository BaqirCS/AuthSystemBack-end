export const HomeReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
      return { ...state, loading: true };

    case 'GET_USER_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'GET_USER_FAIL':
      return { ...state, loading: false, error: true, message: action.payload };
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  users: [],
};
