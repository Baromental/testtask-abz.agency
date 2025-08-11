import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App';
import './index.css';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/testtask-abz.agency">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
