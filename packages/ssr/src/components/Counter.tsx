import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { IState } from 'stores'

const useCounter = () => {
  const count = useSelector((state: IState) => state.count)
  const dispatch = useDispatch()
  const increment = () =>
    dispatch({
      type: 'INCREMENT',
    })
  const decrement = () =>
    dispatch({
      type: 'DECREMENT',
    })
  const reset = () =>
    dispatch({
      type: 'RESET',
    })
  const set = () =>
    dispatch({
      type: 'SET',
      count: 99
    })
  return { count, increment, decrement, reset, set }
}

export const Counter = () => {
  const { count, increment, decrement, reset, set } = useCounter()
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <Button
        variant="contained"
        onClick={increment}
      >
        +1
      </Button>
      <Button
        variant="contained"
        onClick={decrement}
      >
        -1
      </Button>
      <Button
        variant="contained"
        onClick={reset}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        onClick={set}
      >
        Set
      </Button>
    </div>
  )
}
