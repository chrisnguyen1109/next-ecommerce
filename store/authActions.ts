import { getMeApi } from 'apiClient';
import { loginUser, logoutUser, setAuthReady } from './authSlice';
import { AppThunk } from './store';

export const initialAuthApp = (): AppThunk => {
    return async dispatch => {
        try {
            const response = await getMeApi({ notShowError: true });
            if (response.message === 'Success' && response.data?.user) {
                dispatch(loginUser(response.data.user));
            }
        } catch (error) {
            dispatch(logoutUser());
        } finally {
            dispatch(setAuthReady());
        }
    };
};
