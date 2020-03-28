import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import github, { githubSaga } from "./github";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter,
  todos,
  github
});

export default rootReducer;
// 리덕스에서 관리하는 상태에 대한 Type(리덕스 스토어에서 관리하고 있는 상태에 대한 Type)
export type RootState = ReturnType<typeof rootReducer>;


export function* rootSaga() {
   yield all([githubSaga()]);
}