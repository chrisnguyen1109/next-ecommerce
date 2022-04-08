import { ApiResponse } from 'interfaces';
import { NextApiRequest } from 'next';
import Cookies from 'cookies';

export const setCookie = (
    req: NextApiRequest,
    res: ApiResponse,
    name: string,
    value?: string | null,
    options?: Cookies.SetOption
) => {
    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development',
    });

    cookies.set(name, value, options);
};

export const getCookie = (
    req: NextApiRequest,
    res: ApiResponse,
    name: string
) => {
    const cookies = new Cookies(req, res);
    return cookies.get(name);
};
