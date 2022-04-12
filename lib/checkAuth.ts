import createHttpError from 'http-errors';
import { ApiRequest, ApiResponse } from 'interfaces';
import jwt from 'jsonwebtoken';
import { User } from 'models';
import { promisify } from 'util';
import { getCookie } from './setCookie';

export const checkAuth = async (req: ApiRequest, res: ApiResponse) => {
    const accessToken = getCookie(req, res, 'access-token');

    if (!accessToken) {
        throw createHttpError(401, 'Auth required!');
    }

    const decodeAsync = promisify(jwt.verify) as any;

    const token = await decodeAsync(accessToken, process.env.SECRET_KEY);

    const user = await User.findById(token.id);

    if (!user) {
        throw createHttpError(401, 'This user seems to no longer exist!');
    }

    req.user = user;
};
