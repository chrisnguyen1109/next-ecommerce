import { DataCreate, HasId, ResponseData, TimeStamp } from './common';
import { ProductDB } from './product';
import { UserDB } from './user';

export enum Delivery {
    STANDARD_SHIPPING = 'standard',
    PRIORITY_SHIPPING = 'priority',
    NO_SHIPPING = 'none',
}

export const DELIVERY_OPTIONS = Object.values(Delivery).map(el => ({
    key: el.toUpperCase(),
    value: el,
}));

export interface OrderDB {
    address: string;
    mobile: string;
    total: number;
    delivery: Delivery;
    paymentId?: string;
    cart: { quantity: number; product: ProductDB }[];
    paid?: boolean;
    paymentDate?: Date;
    user: UserDB;
}

export type OrderC = OrderDB & HasId & TimeStamp;

export interface OrderCreate extends Omit<DataCreate<OrderC>, 'user' | 'cart'> {
    user: string;
    cart: { quantity: number; product: string }[];
}

export type OrderResponseData = ResponseData<OrderC>;

export type OrderResponseList = ResponseData<OrderC[]>;

export type OrderQuery = {};
