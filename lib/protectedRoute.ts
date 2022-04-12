const PROTECTED_ROUTE = ['/profile', /^\/order\/\w/];

export const isAuthRoute = (path: string) =>
    path === '/signin' || path === '/register';

const PROTECTED_API = [
    {
        method: 'POST',
        path: '/logout',
    },
    {
        method: 'GET',
        path: '/user/me',
    },
    {
        method: 'POST',
        path: '/category',
    },
    {
        method: 'POST',
        path: '/product',
    },
    {
        method: 'PUT',
        path: /^\/product\/\w/,
    },
    {
        method: 'DELETE',
        path: /^\/product\/\w/,
    },
];

export const isProtectedRoute = (path: string) => {
    return !!PROTECTED_ROUTE.find(route =>
        route instanceof RegExp ? route.test(path) : route === path
    );
};

export const isProtectedApi = (path: string, method: string) => {
    return !!PROTECTED_API.find(api => {
        return (
            api.method === method &&
            (api.path instanceof RegExp
                ? api.path.test(path)
                : api.path === path)
        );
    });
};
