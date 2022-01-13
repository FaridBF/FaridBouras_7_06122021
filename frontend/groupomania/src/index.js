import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// va fournir le store à l'app
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
// middleware permettant de faire des requêtes async
import thunk from 'redux-thunk'; // obligatoire
// outils
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';

import rootReducer from './reducers';

/**
 * Crée le store Redux
 */
const store = createStore(
  // retirer composeWithDevtools en production afin d'éviter l'accès au store côté client
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>,
  document.getElementById('root')
);
