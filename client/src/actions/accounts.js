// Dependencies
import axios from 'axios';

// Types
import {
	ACCOUNT_LIST_FAIL,
	ACCOUNT_LIST_REQUEST,
	ACCOUNT_LIST_SUCCESS
} from './types'

// Get Accounts
export const getAccounts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACCOUNT_LIST_REQUEST });
      const response = await axios({
				method: 'GET',
				url: `http://localhost:3001/api/accounts?code=${getCode()}`,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
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

export function getCode() {
  return localStorage.getItem('code')
}