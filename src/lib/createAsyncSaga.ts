import {
  AsyncActionCreatorBuilder,
  PayloadAction,
  EmptyActionCreator,
  PayloadActionCreator
} from "typesafe-actions";
import { call, put } from "redux-saga/effects";


interface AsyncActionGroup<
  T1 extends string,
  P1,
  T2 extends string,
  P2,
  T3 extends string,
  P3
> {
  request: EmptyActionCreator<T1> | PayloadActionCreator<T1, P1>;
  success: EmptyActionCreator<T2> | PayloadActionCreator<T2, P2>;
  failure: EmptyActionCreator<T3> | PayloadActionCreator<T3, P3>;
}

// P : 파라미터, T : 결과 타입
// 파라미터가 있는경우, 없는경우 작성
type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// 타입가드
function isPayloadAction(action: any): action is PayloadAction<string, any> {
  // action.payload 가 undefined 가 아니라면 파라미터로 넘어온 action 은 PayloadAction 타입이다.
  // PayloadAction<string, any>
  // string : action Type, any : action payload
  return action.payload !== undefined;
}

export default function createAsyncSaga<
  T1 extends string,
  P1,
  T2 extends string,
  P2,
  T3 extends string,
  P3
>(
  asyncActionCreator: AsyncActionGroup<T1, P1, T2, P2, T3, P3>,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result: P2 = isPayloadAction(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (e) {
      yield put(asyncActionCreator.failure(e));
    }
  };
}
