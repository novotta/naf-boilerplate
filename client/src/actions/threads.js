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

// Set Thread Error
export const SET_THREAD_ERROR = "setThreadError";
export function setThreadError(data) {
  return function(dispatch) {
    dispatch({
      type: SET_THREAD_ERROR,
      data: data
    });
  };
}

// Set Thread Saved
export const SET_THREAD_SAVED = "setThreadSaved";
export function setThreadSaved(data) {
  return function(dispatch) {
    dispatch({
      type: SET_THREAD_SAVED,
      data: data
    });
  };
}

// Set Thread Touched
export const SET_THREAD_TOUCHED = "setThreadTouched";
export function setThreadTouched(data) {
  return function(dispatch) {
    dispatch({
      type: SET_THREAD_TOUCHED,
      data: data
    });
  };
}

// Create Thread
export function createThread(data) {
  return async (dispatch) => {
    try {
      await axios({
				method: 'POST',
				url: 'https://narmi.novotta.com/api/threads/',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
        data: {
          thread: data.thread
        },
				crossdomain: true,
			});
      dispatch(setThreadSaved(true));
      dispatch(getThreads());
    } catch (error) {
      console.log("THREAD UPDATE ERROR");
    }
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
				url: 'https://narmi.novotta.com/api/threads',
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

// Add Message
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = (thread, message) => {
  return async (dispatch) => {
    try {
      dispatch(setThreadLoading(true));
      const response = await axios({
				method: 'POST',
				url: 'https://narmi.novotta.com/api/threads/' + thread.id + '/messages',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getCode()
				},
        data: {
          message: message
        },
				crossdomain: true,
			});
      dispatch({ type: ADD_MESSAGE, data: response.data });
      dispatch(setThreadLoading(false));
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_MESSAGE, payload: [] });
      dispatch(setThreadLoading(false));
    }
  };
};

// Get Code
export function getCode() {
  return localStorage.getItem('code')
}