import { getMeApi } from 'apiClient';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => {
    const getMeHandler = async () => {
        try {
            const response = await getMeApi();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            ProfilePage
            <button onClick={getMeHandler}>Get me</button>
        </div>
    );
};

export default ProfilePage;
