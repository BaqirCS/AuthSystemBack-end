export const forgotPassReducer = (state, action) => {
  switch (action.type) {
    case 'FORGOT_PASS_REQUEST':
      return { ...state, loading: true };

    case 'FORGOT_PASS_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case 'FORGOT_PASS_FAIL':
      return { ...state, loading: false, error: true, message: action.payload };
    case 'RESET':
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        success: false,
      };
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  message: '',
  success: false,
};
