// Dependencies
import { combineReducers } from "redux";

// Reducers
import {
  accountListReducer,
  accountFavoriteReducer,
  accountUnfavoriteReducer
} from "./accounts";


const rootReducer = combineReducers({
  accountList: accountListReducer,
  accountFavorite: accountFavoriteReducer,
  accountUnfavorite: accountUnfavoriteReducer
})

export default rootReducer