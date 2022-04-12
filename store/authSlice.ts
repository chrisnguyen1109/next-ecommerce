import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserC } from 'interfaces';
import { RootState } from './store';

interface AuthState {
    currentUser: UserC | null;
    isAuthReady: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthReady: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthReady(state) {
            state.isAuthReady = true;
        },
        loginUser(state, action: PayloadAction<UserC>) {
            state.currentUser = action.payload;
        },
        logoutUser(state) {
            state.currentUser = null;
        },
    },
});

// reducers
export const { loginUser, logoutUser, setAuthReady } = authSlice.actions;

// selectors
export const authIsAuthReady = (state: RootState): boolean =>
    state.auth.isAuthReady;

export const authCurrentUser = (state: RootState): UserC | null =>
    state.auth.currentUser;

export default authSlice.reducer;
