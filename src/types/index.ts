export interface IFetchData {
  data: any,
  loading: boolean
}

// src/types/index.tsx
export enum FiltersEnum {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  ACTIVE = "ACTIVE",
}

export interface IStoreState {
  todos: ITodo[];
  currentFilter: FiltersEnum;
}

export interface ITodo {
  id: number
  completed: boolean
  text: string
}


export interface ResponseData<T = any> {
  data: T
  message?: string
}

export interface UserToken {
  accessToken: string;
  expiry: number;
  roles: string[];
  tenantId: string;
  userId: string;
}
