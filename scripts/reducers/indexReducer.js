import { combineReducers } from 'redux';

import { MainPageReducer } from './reducerMainPage';

const IndexReducer = combineReducers({
    MainPageReducer,
});

export { IndexReducer };