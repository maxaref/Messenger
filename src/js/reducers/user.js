'use strict';

const initialState = { data: false };

export default function(state = initialState, action) {
    switch (action.type) {
        case 'AUTH':
            return { ...state, data: action.data };
        default:
            return state;
    }
}
