const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_USER':
      return { message: 'User was changed.', type: 'success' };
    default:
      return {};
  }
}
