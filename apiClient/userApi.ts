import { UpdateProfileForm } from 'containers/profile/ProfileForm';
import { RegisterForm } from 'containers/register';
import { SigninForm } from 'containers/signin';
import { AuthResponse } from 'interfaces';
import { toast } from 'react-toastify';
import axiosClient, { AxiosRequestCustom } from './axiosClient';

export const signinApi = (user: SigninForm): Promise<AuthResponse> => {
    const url = '/signin';

    return axiosClient.post(url, {
        ...user,
    });
};

export const registerApi = (newUser: RegisterForm): Promise<AuthResponse> => {
    const url = '/register';

    return axiosClient.post(url, {
        ...newUser,
    });
};

export const logoutApi = (): Promise<{ message: string }> => {
    const url = '/logout';

    return axiosClient.post(url);
};

export const getMeApi = ({
    notShowError,
    payload = {},
}: {
    notShowError?: boolean;
    payload?: object;
} = {}): Promise<AuthResponse> => {
    const url = '/user/me';

    return axiosClient.get(url, {
        notShowError,
        params: { ...payload },
    } as AxiosRequestCustom);
};

export const updateMeApi = (
    updateUser: UpdateProfileForm
): Promise<AuthResponse> => {
    const url = '/user/me';

    return axiosClient.put(url, {
        ...updateUser,
    });
};

export const uploadAvatar = (image: File): Promise<any> => {
    if (
        !process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET ||
        !process.env.NEXT_PUBLIC_CLOUD_NAME ||
        !process.env.NEXT_PUBLIC_CLOUD_API
    ) {
        const errorMsg = 'Cannot upload image!';

        toast.error(errorMsg);
        throw new Error(errorMsg);
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET
    );
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME);

    return axiosClient.post(process.env.NEXT_PUBLIC_CLOUD_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
