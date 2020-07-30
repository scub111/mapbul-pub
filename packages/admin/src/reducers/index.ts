import { combineReducers } from 'redux';
import { RootState } from 'reducers/state';
import { postReducer } from 'reducers/posts';
// import { todoReducer } from './todos';
// export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers({
   // todos: todoReducer as any
   posts: postReducer
});
