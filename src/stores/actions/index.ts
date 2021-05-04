import { INCREMENT_NUM, ADD_COUNTER, SET_CURRENT_FILTER } from "../constants";
import { FiltersEnum } from "../types";

export * from "./login";
export * from "./todo";

export interface IIncrementCounterAction {
  type: INCREMENT_NUM;
}

export interface IAddCounter {
  type: ADD_COUNTER;
  payload: number;
}

export interface ISetCurrentFilterAction {
  filter: FiltersEnum;
  type: SET_CURRENT_FILTER;
}

export type CounterAction = IIncrementCounterAction | IAddCounter;

export const incrementCounter = (): IIncrementCounterAction => ({
  type: INCREMENT_NUM,
});

export const addCounter = (num: number) => ({
  type: ADD_COUNTER,
  payload: num,
});

export const setCurrentFilter = (
  filter: FiltersEnum
): ISetCurrentFilterAction => ({
  filter,
  type: SET_CURRENT_FILTER,
});
