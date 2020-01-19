import { handleActions } from "redux-actions";
import { counterActions } from "actions";

export interface ICounterState {
  lastUpdate: number;
  light: boolean;
  count: number;
}

export const counterState: ICounterState = {
  lastUpdate: 0,
  light: false,
  count: 10,
};

export const counterReducer = handleActions<ICounterState, number>(
  {
    [counterActions.increment.toString()]: state => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    [counterActions.decrement.toString()]: state => {
      return {
        ...state,
        count: state.count - 1,
      };
    },
    [counterActions.reset.toString()]: state => {
      return {
        ...state,
        count: 0,
      };
    },
    [counterActions.set.toString()]: (state, { payload }) => {
      return {
        ...state,
        count: payload,
      };
    },
  },
  counterState,
);