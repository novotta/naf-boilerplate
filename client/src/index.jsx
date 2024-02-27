// Dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Components
import App from './App';

// Reducers
import rootReducer from './reducers';

// Constants
const store = configureStore({
  reducer: rootReducer
})
const container = document.getElementById('root');
const root = createRoot(container);

// Render
root.render(
  <Provider store={store}>
    <App />
  </Provider >
);