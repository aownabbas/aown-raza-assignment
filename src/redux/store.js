import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer'; // Make sure this path is correct

export const generateStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
  });
};
