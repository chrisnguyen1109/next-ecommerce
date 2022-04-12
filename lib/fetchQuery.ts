import fetchAPI from 'src/utils/fetch-api';

interface ParamsProps {
    service: string;
    api_url: string;
}

interface ItemProps extends ParamsProps {
    uid: string;
}

interface ListProps<T> extends ParamsProps {
    payload: T;
}

interface AddProps<T> extends ParamsProps {
    body: T;
}

interface UpdateProps<T> extends ParamsProps {
    uid: string;
    body: T;
}

interface DeleteProps extends ParamsProps {
    uid: string;
}

const fetchItem = <T>({ uid, service, api_url }: ItemProps): Promise<T> =>
    fetchAPI(
        {
            url: `/${service}/${uid}`,
        },
        undefined,
        api_url
    );

const fetchList = <X, Y>({
    payload,
    service,
    api_url,
}: ListProps<X>): Promise<Y> =>
    fetchAPI(
        {
            url: `/${service}`,
            payload,
        },
        undefined,
        api_url
    );

const addItem = <X, Y>({ body, service, api_url }: AddProps<X>): Promise<Y> =>
    fetchAPI(
        {
            url: `/${service}`,
            options: {
                method: 'POST',
                body: JSON.stringify(body),
            },
        },
        undefined,
        api_url
    );

const updateItem = <X, Y>({
    uid,
    body,
    service,
    api_url,
}: UpdateProps<X>): Promise<Y> =>
    fetchAPI(
        {
            url: `/${service}/${uid}`,
            options: {
                method: 'PUT',
                body: JSON.stringify(body),
            },
        },
        undefined,
        api_url
    );

const deleteItem = <T>({ uid, service, api_url }: DeleteProps): Promise<T> =>
    fetchAPI(
        {
            url: `/${service}/${uid}`,
            options: {
                method: 'DELETE',
            },
        },
        undefined,
        api_url
    );

export { addItem, deleteItem, fetchItem, fetchList, updateItem };
