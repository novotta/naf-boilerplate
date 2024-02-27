// Types
import {
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_RESET,
  ACCOUNT_LIST_SUCCESS
} from '../actions/types';

// Account List
export const accountListReducer = (state = { accounts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_LIST_REQUEST:
      return { loading: true, accounts: [] };
    case ACCOUNT_LIST_SUCCESS:
      return { loading: false, accounts: payload, success: true };
    case ACCOUNT_LIST_FAIL:
      return { loading: false, error: payload, accounts: [] };

    default:
      return state;
  }
};