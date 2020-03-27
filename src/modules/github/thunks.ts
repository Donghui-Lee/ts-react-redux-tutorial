import { getUserProfileAsync } from "./actions";
import { getUserProfile } from "../../api/github";
import createAsyncThunk from "../../lib/createAsyncThunk";

/**
 * ThunkAction 파라미터
 * 리턴 타입 : thunk 함수에서 리턴하는 타입
 * 상태 : Root 상태
 * ExtraThunkArguments
 * Action 들의 타입
 * 
export function getUserProfileThunk(
  username: string
): ThunkAction<void, RootState, null, GithubAction> {
  return async (dispatch, getState) => {
      const state = getState();
  };
}
*/
/*
export function getUserProfileThunk(username: string) {
  //  return async (dispatch: Dispatch, getState: () => RootState) => {}

  return async (dispatch: Dispatch) => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
*/

export const getUserProfileThunk = createAsyncThunk(
  getUserProfileAsync,
  getUserProfile
);
