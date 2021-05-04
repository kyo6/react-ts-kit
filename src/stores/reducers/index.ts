import { combineReducers } from "redux";

import todos from "./todos";
import visibilityFilter from './visibilityFilter'
import currentFilter from "./filters";
import counter from './counter';
export const rootReducer = combineReducers({
  // states
  counter,
  todos,
  currentFilter,
  visibilityFilter
});

export type RootState = ReturnType<typeof rootReducer>;