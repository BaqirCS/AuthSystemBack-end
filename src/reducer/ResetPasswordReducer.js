export const resetPassword = (state, action) => {
  switch (action.type) {
    case 'PASS_RESET_REQUEST':
      return { ...state, loading: true };

    case 'PASS_RESET_SUCCESS':
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };
    case 'PASS_RESET_FAIL':
      return { ...state, loading: false, error: true, message: action.payload };
    case 'RESET':
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        message: '',
      };
    default:
      return state;
  }
};
export const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};
