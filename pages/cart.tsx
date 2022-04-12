import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { authCurrentUser } from 'store/authSlice';
import { useAppSelector } from 'store/hooks';

const CartDetail = dynamic(() => import('containers/cart'), { ssr: false });

const CartPage: NextPage = () => {
    const currentUser = useAppSelector(authCurrentUser);

    return (
        <>
            <Head>
                <title>
                    {currentUser ? `${currentUser.name}'s cart` : 'Your cart'}
                </title>
            </Head>
            <CartDetail />
        </>
    );
};

export default CartPage;
