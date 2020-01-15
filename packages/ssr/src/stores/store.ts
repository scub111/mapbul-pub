import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from 'reducers';

export const initializeStore = (initialState?: any) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
};
