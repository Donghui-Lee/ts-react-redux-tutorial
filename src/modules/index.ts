import {combineReducers} from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
   counter,
   todos 
});

export default rootReducer;
// 리덕스에서 관리하는 상태에 대한 Type(리덕스 스토어에서 관리하고 있는 상태에 대한 Type)
export type RootState = ReturnType<typeof rootReducer>;
