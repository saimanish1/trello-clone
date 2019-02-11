import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/authReducer';
import thunk from 'redux-thunk';
import errorReducer from './store/reducers/errorReducer';
import setAuthToken from './utils/validation/setAuthToken';
import jwt_decode from 'jwt-decode';
import { logoutUser, setCurrentUser } from './store/actions/authActions';
import cardReducer from './store/reducers/cardReducer';
import listReducer from './store/reducers/listReducer';
import boardReducer from './store/reducers/boardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cards: cardReducer,
  list: listReducer,
  boards: boardReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  if (decoded.exp < Date.now() / 1000) {
    store.dispatch(logoutUser());
  }
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
