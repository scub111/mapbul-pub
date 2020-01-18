import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, rootState } from 'reducers';

export const initializeStore = (initialState = rootState) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware()));
};
