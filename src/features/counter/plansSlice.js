import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

export const planSlice = createSlice({
    name: 'plan',
    initialState: {
        plan: null,
    },
    reducers: {
        setPlan: (state, action) => {
            state.plan = action.payload
        },
        // logout: (state) => {
        //     state.user = null
        // }
    },
});

export const { setPlan } = planSlice.actions;
export const selectPlan = (state) => state.plan;
export default planSlice.reducer;