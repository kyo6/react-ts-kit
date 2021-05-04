import { TodoAction } from "../actions";
import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
} from "../constants";
import { ITodo } from "../../types";

const todos = (state: ITodo[] = [], action: TodoAction): ITodo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          completed: false,
          text: action.text,
        },
      ];
    case TOGGLE_TODO:
      return state.map(
        (todo: ITodo, idx: number): ITodo =>
          idx === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
      );
    case EDIT_TODO:
      return state.map(
        (todo: ITodo, idx: number): ITodo =>
          idx === action.index ? { ...todo, text: action.text } : todo
      );
    case DELETE_TODO:
      return state.filter(
        (todo: ITodo, idx: number): boolean => idx !== action.index
      );
    case TOGGLE_ALL_TODOS:
      const isMarkAll =
        state.length > 0 && state.every((todo: ITodo) => todo.completed);
      return state.map(
        (todo: ITodo): ITodo => ({ ...todo, completed: !isMarkAll })
      );
    default:
      return state;
  }
};

export default todos;
