import { browserHistory } from 'react-router';

const router = store => next => (action) => {
  if (action.type === 'ROUTER') browserHistory[action.method](action.url);
  return next(action);
};

export default router;
