import {CounterAction} from '../actions'
import { INCREMENT_NUM, ADD_COUNTER } from "../constants";

interface State {
  count: number;
}

const reduxCounter = (state:number = 0, action: CounterAction):number => {
  switch (action.type) {
    case INCREMENT_NUM:
      return state + 1; // action: { type: "INCREMENT"; }

    case ADD_COUNTER:
      return state + action.payload; // action: { type: "ADD"; payload: number; }

    default:
      return state;
  };

}
export default reduxCounter;