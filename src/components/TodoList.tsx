import React from 'react'
import {ITodo} from '../types'
import Todo from './Todo'


export interface TodoListProps {
  todos: ITodo[],
  toggleTodo(id:number): void
}

const TodoList = ({ todos, toggleTodo }: TodoListProps) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)

export default TodoList