import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../auth/slice';
import loggerSlice from '../logger/slice';
import chatsListSlice from '../home/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
		logger: loggerSlice,
		chats: chatsListSlice
  },
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
