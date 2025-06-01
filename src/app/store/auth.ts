import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";


const initialState = {
    phoneVerifyToken: undefined
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updatePhoneVerifyToken: (state, action) => {
            state.phoneVerifyToken = action.payload;
        }
    }
})


export const { updatePhoneVerifyToken } = authSlice.actions
export const selectPhoneVerifyToken = (state : RootState) => state.auth.phoneVerifyToken
export default authSlice.reducer;