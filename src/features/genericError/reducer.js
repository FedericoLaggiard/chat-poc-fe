import { createSlice } from "@reduxjs/toolkit";

export const GENERIC_ERROR = "GENERIC_ERROR";

const genericErrorState = {
    errors: [],
    count: 0,
}

export const genericErrorSlice = createSlice({
    name: GENERIC_ERROR,
    initialState: genericErrorState,
    reducers: {
        addError: (state, {payload}) => {
            state.errors.push(payload);
            state.count += 1;
        },
        addErrors: (state, {payload}) => {
          state.errors = state.errors.concat(payload);
        },
        setErrorRead: (state, {payload}) => {
            const mutateEl = state.errors.find(x=> x.id === payload);
            mutateEl.read = true;
        }
    }
});

export const {
    addError,
    addErrors,
    setErrorRead,
} = genericErrorSlice.actions;
export default genericErrorSlice.reducer;
