const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.messages;

    case 'ADD_MESSAGE':
      return [...state, action.message];

    default:
      return state;
  }
}
