import update from "immutability-helper";
import {
  SET_THREADS,
  SET_THREAD_LOADING,
  ADD_MESSAGE,
  SET_THREAD_ERROR,
  SET_THREAD_SAVED,
  SET_THREAD_TOUCHED
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
    case SET_THREAD_ERROR:
      return update(state, {
        error: { $set: action.data }
      });
    case SET_THREAD_SAVED:
      return update(state, {
        saved: { $set: action.data }
      });
    case SET_THREAD_TOUCHED:
      return update(state, {
        touched: { $set: action.data }
      });
    case SET_THREADS:
      return update(state, {
        data: { $set: action.data }
      });
    case ADD_MESSAGE:
      return update(state, {

      })

    default:
      return state;
  }
}
