import { createStore } from 'redux';
import reducer from './reducer';
//import * as actionCreators from './actionCreators';
//import * as actionTypes from './actionTypes';

const store=createStore(reducer);

export default store;