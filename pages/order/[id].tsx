import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';

const OrderDetail = dynamic(() => import('containers/orderDetail'));

const OrderDetailPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Detail Order</title>
            </Head>
            <Script
                src={`https://www.paypal.com/sdk/js?client-id=${
                    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''
                }&components=buttons`}
            />
            <OrderDetail />
        </>
    );
};

export default OrderDetailPage;
