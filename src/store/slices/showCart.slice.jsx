import { createSlice } from '@reduxjs/toolkit';

export const showCartSlice = createSlice({
    name: 'showCart',
    initialState: false,
    reducers: {
        setShowCart: (state, action) => {
            return action.payload
        }
    }
})

export const { setShowCart } = showCartSlice.actions;

export default showCartSlice.reducer;
