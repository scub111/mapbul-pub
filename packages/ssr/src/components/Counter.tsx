import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { counterActions } from 'actions';
import { IRootState } from 'reducers';

const useCounter = () => {
  const count = useSelector((state: IRootState) => state.counter.count);
  const dispatch = useDispatch();
  const increment = () => dispatch(counterActions.increment());
  const decrement = () => dispatch(counterActions.decrement());
  const reset = () => dispatch(counterActions.reset());
  const set = () => dispatch(counterActions.set(89));

  return { count, increment, decrement, reset, set };
};

export const Counter = () => {
  const { count, increment, decrement, reset, set } = useCounter();
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <Button variant="contained" onClick={increment}>
        +1
      </Button>
      <Button variant="contained" onClick={decrement}>
        -1
      </Button>
      <Button variant="contained" onClick={reset}>
        Reset
      </Button>
      <Button variant="contained" onClick={set}>
        Set
      </Button>
    </div>
  );
};
