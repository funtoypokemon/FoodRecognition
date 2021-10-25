export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching: true,
        };
      case "UPDATE_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "UPDATE_FAILURE":
        return {
          user: state.user,
          isFetching: false,
          error: true,
        };
    default:
      return state;
  }
};
