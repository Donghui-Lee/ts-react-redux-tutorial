import {
  AsyncActionCreatorBuilder,
  ActionType,
  getType
} from "typesafe-actions";
import { GithubState } from "../modules/github";

export type AsyncState<T, E = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
};

export const asyncState = {
  initial: <T, E>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null
  }),
  load: <T, E>(data?: T | null): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null
  }),
  success: <T, E>(data: T): AsyncState<T, E> => ({
    loading: false,
    data,
    error: null
  }),
  error: <T, E>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error
  })
};

/*
keyof : 상태가 지니고 있는 KEY
const state = {
    a: 1,
    b: 2
}
type key = keyof typeof state;
key = > a, b
*/

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

export function transformToArray<AC extends AnyAsyncActionCreator>(
  asyncActionCreator: AC
) {
  const { request, success, failure } = asyncActionCreator;
  return [request, success, failure];
}

export function createAsyncReducer<S, AC extends AnyAsyncActionCreator, K extends keyof S>(asyncActionCreator: AC, key: K) {
  return (state: S, action: ActionType<AC>) => {
    // 타입 추출
    // const type = getType(asyncActionCreator.request);
    const [request, success, failure] = transformToArray(
      asyncActionCreator
    ).map(getType);

    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.load()
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload)
        };
      case failure:
        return {
          ...state,
          [key]: asyncState.error(action.payload)
        };
      default:
        return state;
    }
  };
}