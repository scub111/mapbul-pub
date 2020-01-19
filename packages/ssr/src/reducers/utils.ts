import { handleActions } from "redux-actions";
import { IActionSet } from "actions";

export interface IPageState<T> {
  currentPage: number;
  list: Array<T>;
  totalPages: number;
}

export const makePageState = <T extends object>(): IPageState<T> => {
  return {
    currentPage: 1,
    list: [],
    totalPages: 0,
  }
}

export const makePageReducer = <T extends object>(actions: IActionSet<T>, initialState: IPageState<T>) => {
  return handleActions<IPageState<T>, number & Array<T>>(
    {
      [actions.incrementCurrentPage.toString()]: (state) => {
        return {
          ...state,
          currentPage: state.currentPage + 1,
        };
      },
      [actions.setList.toString()]: (state, { payload }) => {
        return {
          ...state,
          list: payload,
        };
      },
      [actions.addList.toString()]: (state, { payload }) => {
        return {
          ...state,
          list: [...state.list, ...payload],
        };
      },
      [actions.setTotalPages.toString()]: (state, { payload }) => {
        return {
          ...state,
          totalPages: payload,
        };
      },
    },
    initialState,
  );
}