const initialState = { data: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_FAILED':
      return { ...state, register_message: action.message };
    case 'AUTH_FAILED':
      return { ...state, auth_message: action.message };
    case 'CHANGE_USER':
      return { ...state, data: action.user };
    case 'AUTH_SUCCESS':
      return { ...state, data: action.user };
    case 'REGISTER_SUCCESS':
      return { ...state, registered: true };
    case 'LOGOUT':
      return { ...state, data: false };
    default:
      return state;
  }
}
