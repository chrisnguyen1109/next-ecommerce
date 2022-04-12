import { RegisterForm } from 'containers/register';
import { SigninForm } from 'containers/signin';
import { AuthResponse } from 'interfaces';
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
}: { notShowError?: boolean } = {}): Promise<AuthResponse> => {
    const url = '/user/me';

    return axiosClient.get(url, {
        notShowError,
    } as AxiosRequestCustom);
};
