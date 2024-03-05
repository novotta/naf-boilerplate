
// // Reducers
// import {
//   accountListReducer,
//   accountFavoriteReducer,
//   accountUnfavoriteReducer
// } from "./OLDaccounts";


// const rootReducer = combineReducers({
//   accountList: accountListReducer,
//   accountFavorite: accountFavoriteReducer,
//   accountUnfavorite: accountUnfavoriteReducer
// })


// // Dependencies
import { combineReducers } from 'redux';
import accounts from './accounts';
import threads from './threads';

// Root Reducer
const rootReducer = combineReducers({
	accounts,
  threads
});

// Export
export default rootReducer;