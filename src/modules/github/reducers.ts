import { createReducer, action } from "typesafe-actions";
import { GithubAction, GithubState } from "./types";
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from "./actions";

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

export default github;