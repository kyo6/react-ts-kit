import {connect} from 'react-redux'
import {ITodo} from '../../types'
import { RootState } from "../../stores/reducers";
import {toggleTodo, VisibilityFilters, TodoFilter} from '../../stores/actions'
import TodoList from '../../components/TodoList'

const getVisibleTodos = (todos: ITodo[], filter: TodoFilter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = {
  toggleTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)