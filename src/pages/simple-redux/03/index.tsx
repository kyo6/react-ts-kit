// Context版本Todo：消除组件对全局store的依赖，方便测试
import React, { Component, ChangeEvent, FormEvent } from "react";
import './todo.css'

interface Action {
  type: string
}

enum BuiltinTag {
  IMPORTANT = "重要",
  NOTIMPORTANT = "不重要",
  URGENT = "紧急",
  NOTURGENT = "不紧急"
}

const BUILTIN_TAGS = [BuiltinTag.IMPORTANT, BuiltinTag.NOTIMPORTANT, BuiltinTag.URGENT, BuiltinTag.NOTURGENT];

enum Status {
  CREATED = "创建",
  pending = "准备处理",
  DOING = "进入中",
  PAUSE = "暂停处理",
  FINISHED = "已完成",
  CANCELED = "已取消",
  DELETED = "已删除"
}

class Phase {
  from: Date;
  to?: Date;
  status: Status;
  constructor(status: Status) {
    this.status = status;
    this.from = new Date();
  }
}

class Todo {
  name: string;
  tags: Set<string>;
  created: Date;
  phases: Phase[] = [];
  finished?: Date;
  constructor(name: string, tags: string[] = []) {
    this.name = name;
    this.created = new Date();
    this.tags = new Set(tags);
    this.phases.push(new Phase(Status.CREATED));
  }

  markFinished() {
    this.finished = new Date();
  }
  addTag(tag: string) {
    this.tags.add(tag);
  }
  removeTag(tag: string) {
    this.tags.delete(tag);
  }
}

const TodoHeader = () => {
  return (
    <thead>
      <tr className="todo-list-header">
        <td>创建时间</td>
        <td>名称</td>
        <td>标签</td>
        <td>状态</td>
        <td>操作</td>
      </tr>
    </thead>
  );
};

enum TodoActionType {
  ADD_TAG = "add_tag",
  REMOVE_TAG = "add_tag",
  ADD = "add",
  REMOVE = "remove"
}

interface TodoAction extends Action {
  type: TodoActionType;
  todo: Todo;
}

interface State {}

type StoreListener = () => void;

const __init_action_type = "INIT_STORE";

function createStore<T extends Action, S extends State>(reducer: (state: S, action: T) => S) {
  const listeners: StoreListener[] = [];
  let state: S = {} as any;

  const getState = () => {
    return state
  }

  const subscribe = (listener: StoreListener) => {
    listeners.push(listener);
    const unsubscribe = () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1)
    }
    return unsubscribe
  }

  const dispatch = (action: T) => {
    state = reducer(state, action);
    // midllware
    listeners.forEach(listener => listener());
  }
  dispatch({type: __init_action_type} as T)
  return {dispatch, getState, subscribe}
}

interface TodoAppState extends State {
  todos: Todo[]
}

const store = createStore<TodoAction, TodoAppState>((state, action) => {
  if((action.type as string) === 'INIT_STORE') {
    return {
      todos: [
        new Todo("学习 React", [BuiltinTag.IMPORTANT, BuiltinTag.URGENT]),
        new Todo("学习 TypeScript", [BuiltinTag.IMPORTANT]),
        new Todo("学习 CSS")
      ]
    }
  } else {
    const todos = state.todos.slice();
    switch(action.type) {
      case TodoActionType.ADD: {
        todos.push(action.todo);
        break;
      }
      case TodoActionType.REMOVE:
        const index = todos.indexOf(action.todo);
        todos.splice(index, 1);
        break;
    }
    return { ...state, todos };
  }
});

const StoreContext = React.createContext(store)
type StoreType = typeof store;
export interface TodoItemProps {
  todo: Todo;
}
class TodoItem extends Component<TodoItemProps> {
  static contextType = StoreContext;
  state = {
    showTagSelect: false
  };
  toggleTags = () => {
    this.setState({
      showTagSelect: !this.state.showTagSelect
    });
  };
  onSelectTag = (e: ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    if (tag) {
      const todo = this.props.todo;
      todo.addTag(tag);
      const { dispatch } = this.context as StoreType;
      dispatch({ type: TodoActionType.ADD_TAG, todo: todo });
    }
    this.toggleTags();
  };
  removeTag = (tag: string) => {
    const todo = this.props.todo;
    todo.removeTag(tag);
    const { dispatch } = this.context as StoreType;
    dispatch({type: TodoActionType.REMOVE_TAG, todo})
  }
  removeTodo = () => {
    const { dispatch } = this.context as StoreType;
    dispatch({ type: TodoActionType.REMOVE, todo: this.props.todo });
  };
  render() {
    const todo = this.props.todo;
    const phase = todo.phases[todo.phases.length - 1];
    console.info(`Render TodoItem ${todo.name}`);
    const options = [<option key="---" value="">---</option>];
    for (const tag of BUILTIN_TAGS) {
      options.push(<option key={tag} value={tag}>{tag}</option>);
    }
    const tags = [];
    for (const tag of Array.from(todo.tags)) {
      tags.push(
        <span key={tag} className="todo-tag">
          {tag}
          <button className="tag-remove-button" onClick={() => this.removeTag(tag)}>
            X
          </button>
        </span>
      );
    }
    return (
      <tr className="todo">
        <td className="todo-created">{todo.created.toLocaleTimeString()}</td>
        <td className="todo-name">{todo.name}</td>
        <td className="todo-tags">
          {tags}
          {this.state.showTagSelect ? (
            <label>
              选择标签:<select onChange={this.onSelectTag}>{options}</select>
            </label>
          ) : (
            <button onClick={this.toggleTags} className="tag-add-button">
              ＋
            </button>
          )}
        </td>
        <td className="todo-status">{phase.status}</td>
        <td className="todo-actions">
          <button onClick={this.removeTodo}>删除</button>
        </td>
      </tr>
    )
  }
}

export interface ToDoListProps {
}
export const TodoList = (props: ToDoListProps) => (
  <StoreContext.Consumer>
    {store => (
      <tbody>
        {store.getState().todos.map((todo, index) => {
          return <TodoItem todo={todo} key={todo.name}/>
        })}
      </tbody>
    )}
  </StoreContext.Consumer>
);

interface TodoFormProps {}
class TodoForm extends Component<TodoFormProps> {
  static contextType = StoreContext;
  readonly state = {
    name: ""
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitForm = (e: FormEvent) => {
    e.preventDefault();
    const todo = new Todo(this.state.name);
    const { dispatch } = this.context as StoreType
    dispatch({ type: TodoActionType.ADD, todo: todo });
    this.setState({
      name: ""
    });
  };

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.submitForm} style={{ marginTop: "8px" }}>
        <label>事项名称:</label>
        <input type="text" name="name" value={name} onChange={this.handleChange} autoComplete="off" />
        <input type="button" value="添加" onClick={this.submitForm} style={{ marginLeft: "8px" }} />
      </form>
    );
  }
}

export default class TodoApp extends Component {
  state = store.getState();

  unsubscribe: (() => void) | undefined;

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    return (
      <div className="page-container">
        <StoreContext.Provider value={store}>
          <table>
            <TodoHeader />
            <TodoList />
          </table>
          <TodoForm />
        </StoreContext.Provider>
      </div>
    );
  }
}