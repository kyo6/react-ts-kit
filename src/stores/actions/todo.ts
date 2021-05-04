import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  SET_VISIBILITY_FILTER
} from "../constants";

let nextTodoId = 0

export enum VisibilityFilters {
  SHOW_ALL= 'SHOW_ALL',
  SHOW_COMPLETED= 'SHOW_COMPLETED',
  SHOW_ACTIVE= 'SHOW_ACTIVE'
}

export type TodoFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export interface IAddTodoAction {
  id: number
  text: string;
  type: ADD_TODO;
}

export interface IToggleTodoAction {
  id: number;
  type: TOGGLE_TODO;
}

export interface IEditTodoAction {
  index: number;
  text: string;
  type: EDIT_TODO;
}

export interface IDeleteTodoAction {
  index: number;
  type: DELETE_TODO;
}

export interface IToggleAllTodoAction {
  type: TOGGLE_ALL_TODOS;
}

export interface SetVisibilityFilter {
  type: SET_VISIBILITY_FILTER,
  filter: TodoFilter 
}

export const addTodo = (text: string): IAddTodoAction => ({
  id: nextTodoId++,
  text,
  type: ADD_TODO,
});

export const setVisibilityFilter = (filter: TodoFilter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const toggleTodo = (id: number): IToggleTodoAction => ({
  id,
  type: TOGGLE_TODO,
});

export const deleteTodo = (index: number): IDeleteTodoAction => ({
  index,
  type: DELETE_TODO,
});

export const editTodo = (index: number, text: string): IEditTodoAction => ({
  index,
  text,
  type: EDIT_TODO,
});

export const toggleAllTodos = (): IToggleAllTodoAction => ({
  type: TOGGLE_ALL_TODOS,
});

export type TodoAction =
  | IAddTodoAction
  | IToggleTodoAction
  | IEditTodoAction
  | IDeleteTodoAction
  | IToggleAllTodoAction;
