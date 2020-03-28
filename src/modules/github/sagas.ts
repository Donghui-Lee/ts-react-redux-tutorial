import { getUserProfileAsync, GET_USER_PROFILE } from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { getUserProfile, GithubProfile } from "../../api/github";
import createAsyncSaga from "../../lib/createAsyncSaga";

// call : 특정 함수를 호출해주는 명령
// put : 특정 액션을 dispatch
// takeEvery : 특정 액션을 모니터링, 원하는 액션이 들어오면 사전에 정한 saga 함수를 호출
/*
function* getUserProfileSaga(
  action: ReturnType<typeof getUserProfileAsync.request>
) {
  try {
    // call 사용 시, 결과물에 대한 타입이 추론이 되지 않아 명시적으로 설정(GitHubProfile)
    const userProfile: GithubProfile = yield call(
      getUserProfile,
      action.payload
    );
    yield put(getUserProfileAsync.success(userProfile));
  } catch (e) {
    yield put(getUserProfileAsync.failure(e));
  }
}
*/

const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);

// GET_USER_PROFILE 라는 액션가 발생하면, saga 함수를 실행하도록 처리
export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}
