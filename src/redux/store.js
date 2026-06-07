import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import userReducer from './slices/userSlice.js';
import cartReducer from './slices/cartSlice.js';
import wishlistReducer from './slices/wishlistSlice.js';
import orderReducer from './slices/orderSlice.js';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer
  }
});

export default store;
