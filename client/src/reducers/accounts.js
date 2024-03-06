import update from "immutability-helper";
import {
  SET_ACCOUNT_LOADING,
  SET_ACCOUNT_ERROR,
  SET_ACCOUNTS,
  SET_ACCOUNT_SAVED,
  SET_ACCOUNT_TOUCHED
} from "../actions/accounts";

const initialState = {
  error: null,
  data: null,
  saved: false,
  touched: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT_LOADING:
      return update(state, {
        loading: { $set: action.data }
      });
    case SET_ACCOUNT_ERROR:
      return update(state, {
        error: { $set: action.data }
      });
    case SET_ACCOUNTS:
      return update(state, {
        data: { $set: action.data }
      });
    case SET_ACCOUNT_SAVED:
      return update(state, {
        saved: { $set: action.data }
      });
    case SET_ACCOUNT_TOUCHED:
      return update(state, {
        touched: { $set: action.data }
      });

    default:
      return state;
  }
}