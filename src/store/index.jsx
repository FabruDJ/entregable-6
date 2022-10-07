import { configureStore } from '@reduxjs/toolkit'
import cartListSlice from './slices/cartList.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import purchasesSlice from './slices/purchases.slice'
import showCartSlice from './slices/showCart.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        purchases: purchasesSlice,
        showCart: showCartSlice,
        cartList: cartListSlice
    }
})
