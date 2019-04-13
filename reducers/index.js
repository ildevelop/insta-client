import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import userReducer from './userReducer'
const mystore =createStore(combineReducers({userReducer }), composeWithDevTools(applyMiddleware(thunk)));
export default mystore