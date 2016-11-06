import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers/index'
import thunkMiddleware from 'redux-thunk';

export default createStore(reducer, {}, applyMiddleware(thunkMiddleware));
