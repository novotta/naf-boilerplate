// Dependencies
import axios from 'axios';

// Set Thread Loading
export const SET_THREAD_LOADING = "setThreadLoading";
export function setThreadLoading(data) {
  return function(dispatch) {
    dispatch({
      type: SET_THREAD_LOADING,
      data: data
    });
  };
}

// Get Threads
export const SET_THREADS = "setThreads";
export const getThreads = () => {
  return async (dispatch) => {
    try {
      dispatch(setThreadLoading(true));
      const response = await axios({
				method: 'GET',
				url: 'http://localhost:3001/api/threads',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
				crossdomain: true,
			});
      dispatch({ type: SET_THREADS, data: response.data });
      dispatch(setThreadLoading(false));
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_THREADS, payload: [] });
      dispatch(setThreadLoading(false));
    }
  };
};

// Get Code
export function getCode() {
  return localStorage.getItem('code')
}