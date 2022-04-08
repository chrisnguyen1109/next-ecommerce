import Signin from 'containers/signin';
import { NextPage } from 'next';
import Head from 'next/head';

const SigninPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Sign in Page</title>
            </Head>
            <Signin />
        </>
    );
};

export default SigninPage;
