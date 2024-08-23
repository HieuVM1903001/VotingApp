import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../reducer/userSlice';
import questionSlice from '../reducer/questionSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
