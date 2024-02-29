// Dependencies
import axios from 'axios';

// Types
import {
	ACCOUNT_LIST_FAIL,
	ACCOUNT_LIST_REQUEST,
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
} from './types'

// Get Accounts
export const getAccounts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACCOUNT_LIST_REQUEST });
      const response = await axios({
				method: 'GET',
				url: 'http://localhost:3001/api/accounts',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
				crossdomain: true,
			});
      dispatch({ type: ACCOUNT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ACCOUNT_LIST_FAIL, payload: error });
    }
  };
};

// Favorite Account
export const favoriteAccount = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACCOUNT_FAVORITE_REQUEST });
      const response = await axios({
				method: 'POST',
				url: 'http://localhost:3001/api/accounts/favorite',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
        data: {
          account_id: id
        },
				crossdomain: true,
			});
      dispatch({ type: ACCOUNT_FAVORITE_SUCCESS, payload: response.data });
      console.log("RESPONSE LIKE");
      console.log(response.data);
      dispatch({
        type: ACCOUNT_LIST_UPDATE_FAVORITE,
        payload: { id: id },
      });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ACCOUNT_FAVORITE_FAIL, payload: err });
    }
  };
};

// Reset Favorite Account
export const resetFavoriteAccount = () => {
  return { type: ACCOUNT_FAVORITE_RESET };
};

// Unfavorite Account
export const unfavoriteAccount = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACCOUNT_UNFAVORITE_REQUEST });
      const response = await axios({
				method: 'POST',
				url: 'http://localhost:3001/api/accounts/unfavorite',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
        data: {
          account_id: id
        },
				crossdomain: true,
			});
      dispatch({ type: ACCOUNT_UNFAVORITE_SUCCESS, payload: response.data });
      console.log("RESPONSE UNLIKE");
      console.log(response.data);
      dispatch({
        type: ACCOUNT_LIST_UPDATE_UNFAVORITE,
        payload: { id: id },
      });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ACCOUNT_UNFAVORITE_FAIL, payload: err });
    }
  };
};

// Reset Unfavorite Account
export const resetUnfavoriteAccount = () => {
  return { type: ACCOUNT_UNFAVORITE_RESET };
};

// Get Code
export function getCode() {
  return localStorage.getItem('code')
}