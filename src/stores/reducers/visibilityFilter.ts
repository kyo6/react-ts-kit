
import { VisibilityFilters, SetVisibilityFilter } from '../actions'

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action: SetVisibilityFilter) => {
  console.log(action)
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter || VisibilityFilters.SHOW_ALL
    default:
      return state
  }
}

export default visibilityFilter