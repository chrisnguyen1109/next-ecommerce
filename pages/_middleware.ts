import createHttpError from 'http-errors';
import {
    isAuthRoute,
    isProtectedApi,
    isProtectedRoute,
} from 'lib/protectedRoute';
import { NextMiddleware, NextResponse } from 'next/server';

const authMiddleware: NextMiddleware = async req => {
    const url = req.nextUrl.clone();

    try {
        if (
            (url.pathname.startsWith('/api/v1') &&
                isProtectedApi(
                    url.pathname.replace('/api/v1', ''),
                    req.method
                )) ||
            isProtectedRoute(url.pathname) ||
            isAuthRoute(url.pathname)
        ) {
            if (!req.cookies['access-token']) {
                throw createHttpError(401, 'Auth required!');
            }

            if (isAuthRoute(url.pathname)) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        return NextResponse.next();
    } catch (error: any) {
        if (url.pathname.startsWith('/api/v1')) {
            const status = error.statusCode || 500;
            const message = error.message || 'Something went wrong!';

            return new Response(JSON.stringify({ message }), {
                status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        if (isProtectedRoute(url.pathname)) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        return NextResponse.next();
    }
};

export default authMiddleware;
