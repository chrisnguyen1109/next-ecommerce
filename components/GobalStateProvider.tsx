import { isProtectedRoute } from 'lib/protectedRoute';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { initialAuthApp } from 'store/authActions';
import { authCurrentUser, authIsAuthReady } from 'store/authSlice';
import { cartCart, cartTotalPrice } from 'store/cartSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

interface GlobalStateProviderProps {
    children: ReactNode;
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
    children,
}) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(cartCart);
    const totalPrice = useAppSelector(cartTotalPrice);
    const router = useRouter();
    const pathname = router.asPath;
    const isAuthReady = useAppSelector(authIsAuthReady);
    const currentUser = useAppSelector(authCurrentUser);

    useEffect(() => {
        dispatch(initialAuthApp());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem(
            'next_ecommerce_cart',
            JSON.stringify({ cart, totalPrice })
        );
    }, [cart, totalPrice]);

    useEffect(() => {
        if (isAuthReady && !currentUser && isProtectedRoute(pathname)) {
            router.replace('/signin');
        }
    }, [currentUser, pathname]);

    return <>{children}</>;
};

export default GlobalStateProvider;
