import {
    OrderC,
    OrderCreate,
    OrderQuery,
    OrderResponseData,
    OrderResponseList,
} from 'interfaces';
import initialCustomQuery, { Feature } from './useCustomQuery';

class OrderClass implements Feature {
    constructor(
        public readonly service: string,
        public readonly queryKey: string
    ) {}
}

const orderInstance = new OrderClass('/order', 'order_list');

export const {
    useItem: useOrder,
    useList: useOrders,
    useCreateItem: useCreateOrder,
    useUpdateItem: useUpdateOrder,
    useDeleteItem: useDeleteOrder,
} = initialCustomQuery<
    OrderC,
    OrderResponseData,
    OrderResponseList,
    OrderQuery,
    OrderCreate
>(orderInstance);
