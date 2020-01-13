import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Article } from 'models';

export interface IState {
  lastUpdate: number,
  light: boolean,
  count: number,
  articles: Array<Article>,
}

const initialState: IState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  articles: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      };
    case 'SET':
      return {
        ...state,
        count: action.count,
      };
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.articles,
      };
    case 'ADD_ARTICLES':
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
      };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware()));
};
