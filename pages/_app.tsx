import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStateProvider from 'components/GobalStateProvider';
import Layout from 'components/Layout';
import { AppPropsWithLayout } from 'interfaces';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from 'store/store';
import 'styles/global.css';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
});

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const AppLayout = Component.Layout ?? Layout;

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <GlobalStateProvider>
                    <AppLayout>
                        <Head>
                            <title>Next Ecommerce</title>
                            <meta
                                name="description"
                                content="E-commerce website with Next.js"
                            />
                            <meta
                                name="viewport"
                                content="initial-scale=1.0, width=device-width"
                            />
                        </Head>
                        <Component {...pageProps} />
                    </AppLayout>
                    <ToastContainer />
                </GlobalStateProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default MyApp;
