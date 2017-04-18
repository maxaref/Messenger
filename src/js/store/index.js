import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import router from '../middlewares/router';
import reducers from '../reducers';

const initialState = {};
export default createStore(reducers, initialState, applyMiddleware(router, thunk));
