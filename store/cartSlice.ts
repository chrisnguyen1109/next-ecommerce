import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductC } from 'interfaces';
import { RootState } from './store';

export interface CartItem extends ProductC {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    totalPrice: number;
}

const initalCart = process.browser
    ? JSON.parse(localStorage.getItem('next_ecommerce_cart') || '""')
    : {};

const initialState: CartState = {
    cart: initalCart.cart || [],
    totalPrice: initalCart.totalPrice || 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ProductC>) {
            state.cart.push({
                ...action.payload,
                quantity: 1,
            });

            state.totalPrice += action.payload.price;
        },
        increaseItem(state, action: PayloadAction<string>) {
            const itemIndex = state.cart.findIndex(
                el => el._id === action.payload
            );

            const item = state.cart[itemIndex];

            item.quantity++;
            state.totalPrice += item.price;
        },
        decreaseItem(state, action: PayloadAction<string>) {
            const itemIndex = state.cart.findIndex(
                el => el._id === action.payload
            );

            const item = state.cart[itemIndex];

            item.quantity--;
            state.totalPrice -= item.price;

            if (item.quantity === 0) {
                state.cart.splice(itemIndex, 1);
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            const itemIndex = state.cart.findIndex(
                el => el._id === action.payload
            );

            const item = state.cart[itemIndex];

            state.totalPrice -= item.price * item.quantity;

            state.cart.splice(itemIndex, 1);
        },
        clearCart(state) {
            state.totalPrice = 0;
            state.cart = [];
        },
    },
});

// reducers
export const { addItem, decreaseItem, increaseItem, removeItem, clearCart } =
    cartSlice.actions;

// selectors
export const cartCart = (state: RootState): CartItem[] => state.cart.cart;

export const cartTotalPrice = (state: RootState): number =>
    state.cart.totalPrice;

export default cartSlice.reducer;
