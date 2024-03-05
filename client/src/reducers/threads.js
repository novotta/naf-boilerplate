import update from "immutability-helper";
import {
  SET_THREADS,
  SET_THREAD_LOADING
} from "../actions/threads";

const initialState = {
  form: false,
  error: null,
  data: null,
  savings: null,
  saved: false,
  timeUntilCompletion: [],
  touched: false,
  rules: [],
  nextSavingDate: "N/a",
  nextSavingAmount: "N/a"
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

    default:
      return state;
  }
}