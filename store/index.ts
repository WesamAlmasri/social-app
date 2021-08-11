import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import Reducers
import userDetailsReducer from './userDetails/reducer';
import notificationsReducer from './notifications/reducer';

const reducers = combineReducers({
  user: userDetailsReducer,
  notifications: notificationsReducer,
});

const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

export default store();
