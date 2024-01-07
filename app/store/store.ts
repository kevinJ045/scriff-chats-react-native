import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../auth/slice';
import loggerSlice from '../logger/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
		logger: loggerSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
