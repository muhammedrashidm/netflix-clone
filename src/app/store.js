import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';
import planReducer from '../features/counter/plansSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    plan: planReducer
  },
});
