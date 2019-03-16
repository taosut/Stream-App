// External Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

// Internal Imports
import App from './components/App.js';
import reducers from './reducers';

// Setup for Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware())
);

// Remember to give <Provider> a 'store' property.
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));