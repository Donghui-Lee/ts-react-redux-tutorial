import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { GitHubProfile } from "../../api/github";

// Action Type
export const GET_USER_PROFILE = "github/GET_USER_PROFILE";
export const GET_USER_PROFILE_SUCCESS = "github/GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_ERROR = "github/GET_USER_PROFILE_ERROR";

// Action 생성자
export const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR
)<undefined, GitHubProfile, AxiosError>();

// Reducer
