import { createAction } from 'redux-actions';

enum CounterActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  SET = 'SET',
}

export const counterActions = {
  increment: createAction(CounterActionType.INCREMENT),
  decrement: createAction(CounterActionType.DECREMENT),
  reset: createAction(CounterActionType.RESET),
  set: createAction<number>(CounterActionType.SET),
};
