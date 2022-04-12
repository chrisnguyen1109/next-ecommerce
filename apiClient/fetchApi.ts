import axiosClient from './axiosClient';

interface ParamsProps {
    service: string;
}

interface ItemProps extends ParamsProps {
    id: string;
}

interface ListProps<T> extends ParamsProps {
    payload: T;
}

interface CreateProps<T> extends ParamsProps {
    body: T;
}

interface UpdateProps<T> extends ParamsProps {
    id: string;
    body: T;
}

interface DeleteProps extends ParamsProps {
    id: string;
}

const fetchItem = <T>({ id, service }: ItemProps): Promise<T> =>
    axiosClient.get(`${service}/${id}`);

const fetchList = <X, Y>({ payload, service }: ListProps<X>): Promise<Y> =>
    axiosClient.get(service, {
        params: { ...payload },
    });

const createItem = <X, Y>({ body, service }: CreateProps<X>): Promise<Y> =>
    axiosClient.post(service, {
        ...body,
    });

const updateItem = <X, Y>({ id, body, service }: UpdateProps<X>): Promise<Y> =>
    axiosClient.put(`${service}/${id}`, {
        ...body,
    });

const deleteItem = <T>({ id, service }: DeleteProps): Promise<T> =>
    axiosClient.delete(`${service}/${id}`);

export { createItem, deleteItem, fetchItem, fetchList, updateItem };
