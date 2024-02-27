// Dependencies
import { combineReducers } from "redux";

// Reducers
import {
  accountListReducer
} from "./accounts";


const rootReducer = combineReducers({
  accountList: accountListReducer
})

export default rootReducer