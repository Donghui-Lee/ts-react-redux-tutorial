import { Dispatch } from "redux";
import {
  AsyncActionCreatorBuilder,
  EmptyActionCreator
} from "typesafe-actions";

// Util 함수 작성

// typesafe-actions 4.x => 5.x
// AsyncActionCreator => AsyncActionCreatorBuilder
type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;
type AnyPromiseCreator = (...params: any[]) => Promise<any>;

// extends 사용 시 generic 으로 어떤것이라도 가져올 수 있지만, 해당 타입이 지정한 타입으로 만족해야지만 사용 가능
export default function createAsyncThunk<
  A extends AnyAsyncActionCreator,
  F extends AnyPromiseCreator
>(asyncActionCreator: A, promiseCreator: F) {
  // Parameters 는 F 함수의 파라미터를 추출
  type Params = Parameters<F>;

  return function thunk(...params: Params) {
    return async (dispatch: Dispatch) => {
      const { request, success, failure } = asyncActionCreator;

      dispatch(request(undefined));
      try {
        const result = await promiseCreator(...params);
        dispatch(success(result));
      } catch (e) {
        dispatch(failure(e));
      }
    };
  };
}
