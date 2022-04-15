import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Profile = dynamic(() => import('containers/profile'));

const ProfilePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Your profile</title>
            </Head>
            <Profile />
        </>
    );
};

export default ProfilePage;
