import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';

import './index.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </>
);
