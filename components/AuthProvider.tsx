import { getMe } from 'apiClient';
import { ReactNode, useEffect, useRef } from 'react';
import { loginUser, logoutUser, setAuthReady } from 'store/authSlice';
import { useAppDispatch } from 'store/hooks';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const firstRender = useRef<boolean>(false);

    useEffect(() => {
        if (firstRender.current) return;

        firstRender.current = true;

        (async () => {
            try {
                const response = await getMe();
                if (response.message === 'Success') {
                    dispatch(loginUser(response.data.user));
                }
            } catch (error) {
                dispatch(logoutUser());
            } finally {
                dispatch(setAuthReady());
            }
        })();
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthProvider;
