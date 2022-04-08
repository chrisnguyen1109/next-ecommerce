export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface User {
    _id: string;
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

export interface UserResponse {
    message: string;
    data: {
        user: User;
    };
}
