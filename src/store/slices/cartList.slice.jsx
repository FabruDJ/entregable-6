import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartListSlice = createSlice({
    name: 'cartList',
    initialState: [],
    reducers: {
        setCartList: (state, action) => {
            const cartList = action.payload
            return cartList
        }
    }
})

export const getCartListThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCartList(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addProductThunk = (product) => dispatch => {
    dispatch(setIsLoading(true))
    axios.post(
            'https://ecommerce-api-react.herokuapp.com/api/v1/cart', 
            product,
            getConfig(),
        )
        .then(res => dispatch(getCartListThunk()))
        .finally(() => dispatch(setIsLoading(false)))
}

export const purchaseProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.post(
            'https://ecommerce-api-react.herokuapp.com/api/v1/purchases', 
            {},
            getConfig(),
        )
        .then(res => dispatch(setCartList([])))
        .finally(() => dispatch(setIsLoading(false)))
}

export const deleteProductThunk = (id) => dispatch => {
    dispatch(setIsLoading(true))
    axios.delete(
            `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,
            getConfig()
        )
        .then(res => dispatch(getCartListThunk()))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setCartList } = cartListSlice.actions;

export default cartListSlice.reducer;
