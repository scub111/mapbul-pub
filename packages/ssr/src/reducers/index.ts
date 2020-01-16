import { Article } from 'models';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { counterActions } from 'actions';

export interface IState {
  lastUpdate: number;
  light: boolean;
  count: number;
  articles: Array<Article>;
}

export const initialState: IState = {
  lastUpdate: 0,
  light: false,
  count: 10,
  articles: [],
};

// export const reducer = (state = initialState, action: IState & {type: string}) => {
//   switch (action.type) {
//     case 'TICK':
//       return {
//         ...state,
//         lastUpdate: action.lastUpdate,
//         light: !!action.light,
//       };
//     case 'INCREMENT':
//       return {
//         ...state,
//         count: state.count + 1,
//       };
//     case 'DECREMENT':
//       return {
//         ...state,
//         count: state.count - 1,
//       };
//     case 'RESET':
//       return {
//         ...state,
//         count: initialState.count,
//       };
//     case 'SET':
//       return {
//         ...state,
//         count: action.count,
//       };
//     case 'SET_ARTICLES':
//       return {
//         ...state,
//         articles: action.articles,
//       };
//     case 'ADD_ARTICLES':
//       return {
//         ...state,
//         articles: [...state.articles, ...action.articles],
//       };
//     default:
//       return state;
//   }
// };

export const reducer = handleActions<IState, number & Array<Article>>(
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
    [counterActions.setArticles.toString()]: (state, { payload }) => {
      return {
        ...state,
        articles: payload,
      };
    },
    [counterActions.addArticles.toString()]: (state, { payload }) => {
      return {
        ...state,
        articles: [...state.articles, ...payload],
      };
    },
  },
  initialState,
);

export const rootReducer = combineReducers({
  // todos: todoReducer as any
  articles: reducer,
});
