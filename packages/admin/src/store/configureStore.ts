import { Store, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'middleware';
import { rootReducer } from 'reducers';
import { PostActions } from 'actions/posts';
import thunk from 'redux-thunk';
import rootSaga from 'sagas';

export function configureStore(initialState?: any): Store {
   const sagaMiddleware = createSagaMiddleware();
   let middleware = compose(
      // applyMiddleware(thunk),
      applyMiddleware(sagaMiddleware),
      applyMiddleware(logger)
   );

   const t = 10;

   if (process.env.NODE_ENV !== 'production') {
      middleware = composeWithDevTools(middleware);
   }

   const store = createStore(rootReducer as any, initialState as any, middleware) as Store;

   sagaMiddleware.run(rootSaga);

   return store;
}
