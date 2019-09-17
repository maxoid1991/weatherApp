import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { IndexReducer } from '../reducers/indexReducer';

const store = createStore(IndexReducer, applyMiddleware(thunk));

export { store };