import { OrderDB, OrderResponseData } from 'interfaces';
import axiosClient from './axiosClient';

export const createOrderApi = (order: OrderDB): Promise<OrderResponseData> => {
    const url = '/order';

    return axiosClient.post(url, {
        ...order,
    });
};

export const getOrderByIdApi = (id: string): Promise<OrderResponseData> => {
    const url = `/order/${id}`;

    return axiosClient.get(url);
};
