import { createReducer } from "typesafe-actions";
import { GithubAction, GithubState } from "./types";
import { getUserProfileAsync } from "./actions";
import {
  asyncState,
  transformToArray,
  createAsyncReducer
} from "../../lib/reducerUtils";

/*
const initialState = {
  userProfile: {
    loading: false,
    error: null,
    data: null
  }
};

const github = createReducer<GithubState, GithubAction>(initialState, {
  [GET_USER_PROFILE]: (state, action) => ({
    ...state,
    userProfile: {
      loading: true,
      error: null,
      data: null
    }
  }),
  [GET_USER_PROFILE_SUCCESS] : (state, action) => ({
      ...state,
      userProfile: {
          loading: false,
          error: null,
          data: action.payload
      }
  }),
  [GET_USER_PROFILE_ERROR] : (state, action) => ({
      ...state,
      userProfile: {
          loading: false,
          error: action.payload,
          data: null
      }
  })
});
*/

const initialState: GithubState = {
  userProfile: asyncState.initial()
};
/*
const github = createReducer<GithubState, GithubAction>(initialState, {
  [GET_USER_PROFILE]: (state, action) => ({
    ...state,
    userProfile: asyncState.load()
  }),
  [GET_USER_PROFILE_SUCCESS] : (state, action) => ({
      ...state,
      userProfile: asyncState.success(action.payload)
  }),
  [GET_USER_PROFILE_ERROR] : (state, action) => ({
      ...state,
      userProfile: asyncState.error(action.payload)
  })
});
*/

const github = createReducer<GithubState, GithubAction>(
  initialState
).handleAction(
  transformToArray(getUserProfileAsync),
  createAsyncReducer(getUserProfileAsync, "userProfile")
);
export default github;
