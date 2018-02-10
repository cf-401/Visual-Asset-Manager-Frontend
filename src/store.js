import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import {
  auth,
  fileData,
  middleware,
  selections,
} from './state';

const reducers = {
  fileData: fileData.reducer,
  auth: auth.reducer,
  selections: selections.reducer,
};

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, applyMiddleware(middleware.thunk));

export default store;
