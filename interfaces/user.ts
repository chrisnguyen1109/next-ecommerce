import { HasId, ResponseData, TimeStamp } from './common';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface UserC extends HasId, TimeStamp {
    name: string;
    email: string;
    role?: UserRole;
    avatar?: string;
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
