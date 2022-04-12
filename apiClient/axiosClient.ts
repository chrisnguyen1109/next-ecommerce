import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { logoutUser } from 'store/authSlice';
import { store } from 'store/store';

export interface AxiosRequestCustom extends AxiosRequestConfig {
    notShowError?: boolean;
}

const axiosClient = axios.create({
    baseURL: '/api/v1',
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config: AxiosRequestCustom) => {
    return config;
});

axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    error => {
        if (!error.config.notShowError) {
            let errorMessage: string;

            if (error.response && error.response.data) {
                errorMessage = error.response.data?.message;
            } else if (error.request) {
                errorMessage =
                    'The request was made but no response was received!';
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage || 'Something went wrong!');
        }

        if (error.response.status === 401) {
            store.dispatch(logoutUser());
        }

        throw error;
    }
);

export default axiosClient;
