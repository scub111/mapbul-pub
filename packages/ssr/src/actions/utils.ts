import { createAction, Action } from 'redux-actions';

export interface IActionSet<T> {
  incrementCurrentPage: () => Action<any>;
  setList: (newList: Array<T>) => Action<Array<T>>;
  addList: (newList: Array<T>) => Action<Array<T>>;
  setTotalPages: (totalPages: number) => Action<number>;
  setLoading: (loading: boolean) => Action<any>;
}

export const makePageActions = <T extends object>(name: string): IActionSet<T> => {
  return {
    incrementCurrentPage: createAction(`${name}_INCREMENT_CURRENT_PAGE`),
    setList: createAction<Array<T>>(`${name}_SET_LIST`),
    addList: createAction<Array<T>>(`${name}_ADD_LIST`),
    setTotalPages: createAction<number>(`${name}_SET_TOTAL_PAGES`),
    setLoading: createAction<boolean>(`${name}_SET_LOADING`),
  };
};
