import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {
    isAuthRoute,
    isProtectedApi,
    PROTECTED_ROUTE,
} from 'lib/protectedRoute';
import { NextMiddleware, NextResponse } from 'next/server';
import { promisify } from 'util';

const authMiddleware: NextMiddleware = async req => {
    const url = req.nextUrl.clone();

    try {
        if (
            (url.pathname.startsWith('/api/v1') &&
                isProtectedApi(
                    url.pathname.replace('/api/v1', ''),
                    req.method
                )) ||
            PROTECTED_ROUTE.includes(url.pathname) ||
            isAuthRoute(url.pathname)
        ) {
            if (!req.cookies['access-token']) {
                throw createHttpError(401, 'Auth required!');
            }

            if (!process.env.SECRET_KEY) {
                throw createHttpError(500, 'Internal server error!');
            }

            const decodeAsync = promisify(jwt.verify) as any;

            await decodeAsync(
                req.cookies['access-token'],
                process.env.SECRET_KEY
            );

            if (isAuthRoute(url.pathname)) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        return NextResponse.next();
    } catch (error: any) {
        if (url.pathname.startsWith('/api/v1')) {
            if (isProtectedApi(url.pathname, req.method)) {
                error.name === 'JsonWebTokenError' &&
                    (error = createHttpError(401, 'Invalid token!'));
                error.name === 'TokenExpiredError' &&
                    (error = createHttpError(401, 'Token has been expired!'));
            }

            const status = error.statusCode || 500;
            const message = error.message || 'Something went wrong!';

            return new Response(JSON.stringify({ message }), {
                status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        if (PROTECTED_ROUTE.includes(url.pathname)) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        return NextResponse.next();
    }
};

export default authMiddleware;
