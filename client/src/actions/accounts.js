// Dependencies
import axios from 'axios';

// Types
import {
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

// Set Account Loading
export const SET_ACCOUNT_LOADING = "setAccountLoading";
export function setAccountLoading(data) {
  return function(dispatch) {
    dispatch({
      type: SET_ACCOUNT_LOADING,
      data: data
    });
  };
}

// Set Account Error
export const SET_ACCOUNT_ERROR = "setAccountError";
export function setAccountError(data) {
  return function(dispatch) {
    dispatch({
      type: SET_ACCOUNT_ERROR,
      data: data
    });
  };
}

// Set Account Saved
export const SET_ACCOUNT_SAVED = "setAccountSaved";
export function setAccountSaved(data) {
  return function(dispatch) {
    dispatch({
      type: SET_ACCOUNT_SAVED,
      data: data
    });
  };
}

// Set Account Touched
export const SET_ACCOUNT_TOUCHED = "setAccountTouched";
export function setAccountTouched(data) {
  return function(dispatch) {
    dispatch({
      type: SET_ACCOUNT_TOUCHED,
      data: data
    });
  };
}

// Get Accounts
export const SET_ACCOUNTS = "setAccounts";
export const getAccounts = () => {
  return async (dispatch) => {
    try {
      dispatch(setAccountLoading(true));
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
      dispatch({ type: SET_ACCOUNTS, data: response.data });
      dispatch(setAccountLoading(false));
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_ACCOUNTS, payload: [] });
      dispatch(setAccountLoading(false));
    }
  };
};

// Edit Account
export function editAccount(data) {
  // return function(dispatch, getState) {
  //   return new Promise(function(resolve, reject) {
  //     superagent
  //       .put(config.backendUrl + "/goals/" + data.goal.id)
  //       .set("Authorization", "Bearer " + getState().auth.data.vendorKey)
  //       .set("Accept", "application/json")
  //       .set("Content-Type", "application/json")
  //       .send(data.goal)
  //       .end(function(err, res) {
  //         if (err) {
  //           return;
  //         }

  //         dispatch(setGoalSaved(true));
  //         dispatch(getGoals());
  //         // Get time until completion
  //         const safeRecurringState = recurringState || {};
  //         const recurringDelta = {
  //           id: data.goal.id,
  //           frequency: safeRecurringState.frequency,
  //           amount: safeRecurringState.amount,
  //           repeats: safeRecurringState.repeats,
  //           startDt: moment.utc(safeRecurringState.startDt).format()
  //         };
  //         dispatch(getTimeUntilCompl(recurringDelta));
  //         dispatch(getNotifications());
  //       });
  //   });
  // };

  return async (dispatch) => {
    try {
      const response = await axios({
				method: 'PATCH',
				url: 'http://localhost:3001/api/accounts/' + data.account.id,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
        data: {
          account: data.account
        },
				crossdomain: true,
			});
      console.log("ACCOUNT UPDATED");
      dispatch(setAccountSaved(true));
      dispatch(getAccounts());
    } catch (error) {
      console.log("ACCOUNT UPDATE ERROR");
    }
  };
}





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