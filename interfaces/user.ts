import { HasId, ResponseData, TimeStamp } from './common';
import { OrderC } from './order';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface UserC extends HasId, TimeStamp {
    name: string;
    email: string;
    role?: UserRole;
    avatar?: string;
    orders?: Omit<OrderC, 'paymentId' | 'cart' | 'user'>[];
}

export interface UserDB {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    avatar: string;
}

export type AuthResponse = ResponseData<{ user: UserC }>;
