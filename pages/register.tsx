import Register from 'containers/register';
import { NextPage } from 'next';
import Head from 'next/head';

const RegisterPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Register Page</title>
            </Head>
            <Register />
        </>
    );
};

export default RegisterPage;
