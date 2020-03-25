import { addTodo, toggleTodo, removeTodo } from "./actions";

export type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

// 상태에서 사용할 할일/항목 데이터에 대한 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodosState = Todo[];
