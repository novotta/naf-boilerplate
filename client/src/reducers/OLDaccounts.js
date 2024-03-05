// Types
import {
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_RESET,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_UPDATE_FAVORITE,
  ACCOUNT_LIST_UPDATE_UNFAVORITE,
  ACCOUNT_FAVORITE_FAIL,
  ACCOUNT_FAVORITE_REQUEST,
  ACCOUNT_FAVORITE_RESET,
  ACCOUNT_FAVORITE_SUCCESS,
  ACCOUNT_UNFAVORITE_FAIL,
  ACCOUNT_UNFAVORITE_REQUEST,
  ACCOUNT_UNFAVORITE_RESET,
  ACCOUNT_UNFAVORITE_SUCCESS
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
    case ACCOUNT_LIST_RESET:
      return { accounts: [] };
    case ACCOUNT_LIST_UPDATE_FAVORITE:
      console.log("LIKE PAYLOAD");
      console.log(payload);
      return {
        accounts: state.accounts.map((account) => {
          if (account.id === payload.id) {
            return account;
          } else {
            return account;
          }
        }),
        success: true,
      };
    case ACCOUNT_LIST_UPDATE_UNFAVORITE:
      console.log("UNLIKE PAYLOAD");
      console.log(payload);
      return {
        success: true,
        accounts: state.accounts.map((account) => {
          if (account.id === payload.id) {
            return account;
          } else {
            return account;
          }
        }),
      };

    default:
      return state;
  }
};

export const accountFavoriteReducer = (state = { }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_FAVORITE_REQUEST:
      return { loading: true };
    case ACCOUNT_FAVORITE_SUCCESS:
      return { success: true };
    case ACCOUNT_FAVORITE_FAIL:
      return { error: payload };
    case ACCOUNT_FAVORITE_RESET:
      return { };
    default:
      return state;
  }
};

export const accountUnfavoriteReducer = (state = { }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_UNFAVORITE_REQUEST:
      return { loading: true };
    case ACCOUNT_UNFAVORITE_SUCCESS:
      return { success: true };
    case ACCOUNT_UNFAVORITE_FAIL:
      return { error: payload };
    case ACCOUNT_UNFAVORITE_RESET:
      return { };
    default:
      return state;
  }
};