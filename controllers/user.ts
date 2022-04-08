import createHttpError from 'http-errors';
import { ApiRequest, ApiResponse } from 'interfaces';
import { checkAuth, EXPIRE_TIME, setCookie } from 'lib';
import { User } from 'models';

export const register = async (req: ApiRequest, res: ApiResponse) => {
    const newUser = await User.create({
        ...req.body,
    });

    const accessToken = await newUser.generateToken();

    setCookie(req, res, 'access-token', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(EXPIRE_TIME),
    });

    return res.status(201).json({
        message: 'Success',
        data: {
            user: newUser,
        },
    });
};

export const signin = async (req: ApiRequest, res: ApiResponse) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw createHttpError(400, 'Please provide email and password!');
    }

    const user = await User.findByCredentials(email, password);

    const accessToken = await user.generateToken();

    setCookie(req, res, 'access-token', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(EXPIRE_TIME),
    });

    return res.status(201).json({
        message: 'Success',
        data: {
            user,
        },
    });
};

export const logout = async (req: ApiRequest, res: ApiResponse) => {
    await checkAuth(req, res);

    setCookie(req, res, 'access-token', null, { expires: new Date(0) });

    return res.status(200).json({
        message: 'Success',
    });
};

export const getMe = async (req: ApiRequest, res: ApiResponse) => {
    await checkAuth(req, res);

    return res.status(200).json({
        message: 'Success',
        data: {
            user: req.user,
        },
    });
};
