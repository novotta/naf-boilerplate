// Dependencies
import axios from 'axios';

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
				url: 'https://narmi.novotta.com/api/accounts',
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
  console.log("EDIT ACCOUNT ACTION");
  console.log(data);

  return async (dispatch) => {
    try {
      const response = await axios({
				method: 'PATCH',
				url: 'https://narmi.novotta.com/api/accounts/' + data.account.id,
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

// Get Code
export function getCode() {
  return localStorage.getItem('code')
}