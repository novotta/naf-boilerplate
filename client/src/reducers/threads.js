import update from "immutability-helper";
import {
  SET_THREADS,
  SET_THREAD_LOADING,
  SELECT_THREAD
} from "../actions/threads";

const initialState = {
  error: null,
  data: null,
  saved: false,
  touched: false,
  selectedThread: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_THREAD_LOADING:
      return update(state, {
        loading: { $set: action.data }
      });
    case SET_THREADS:
      return update(state, {
        data: { $set: action.data }
      });
    case SELECT_THREAD:
      return {
        ...state,
        selectedThread: action.payload,
      };

    default:
      return state;
  }
}