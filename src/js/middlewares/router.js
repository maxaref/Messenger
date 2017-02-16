'use strict';

import { browserHistory } from 'react-router';

export default store => next => action => {
    if(action.type == 'ROUTER') browserHistory[action.method](action.url);
    return next(action);
}
