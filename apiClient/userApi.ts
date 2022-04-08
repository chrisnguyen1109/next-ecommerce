import { RegisterForm } from 'containers/register';
import { SigninForm } from 'containers/signin';
import { ServerResponse, UserResponse } from 'interfaces';
import axiosClient, { AxiosRequestCustom } from './axiosClient';

export const signin = (user: SigninForm): Promise<UserResponse> => {
    const url = '/signin';

    return axiosClient.post(url, {
        ...user,
    });
};

export const register = (newUser: RegisterForm): Promise<UserResponse> => {
    const url = '/register';

    return axiosClient.post(url, {
        ...newUser,
    });
};

export const logout = (): Promise<ServerResponse> => {
    const url = '/logout';

    return axiosClient.post(url);
};

export const getMe = (): Promise<UserResponse> => {
    const url = '/user/me';

    return axiosClient.get(url, {
        notShowError: true,
    } as AxiosRequestCustom);
};
