// External Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Internal Imports
import App from './components/App.js';
import reducers from './reducers';

const store = createStore(reducers);

// Remember to give <Provider> a 'store' property.
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));