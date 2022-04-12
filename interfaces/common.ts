import { NextApiRequest, NextApiResponse, NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';
import { UserDB } from './user';
import { Document } from 'mongoose';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
    Layout?: React.FC<{ children: ReactNode }>;
};

export interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

export interface HasId {
    _id: string;
}

export interface TimeStamp {
    createdAt: Date;
    updatedAt: Date;
}

export interface Pagination {
    records: number;
    total_records: number;
    limit: number;
    page: number;
    total_page: number;
}

export type ServerResponse<T> = T extends Document[]
    ? { data: { records: T; pagination: Pagination } }
    : T extends Document
    ? { data: { record: T } }
    : { data?: Record<string, any> };

export type ApiResponse<T = any> = NextApiResponse<
    ServerResponse<T> & { message: string }
>;

export type ApiRequest = NextApiRequest & {
    user?: UserDB & HasId;
};

export type FieldOfModel<T extends Document> = keyof Omit<T, keyof Document>;

export type CallBack<T extends any[] = any> = (...args: T) => void;

export interface ResponseData<T = any> {
    message: string;
    data?: T extends HasId[]
        ? { records: T; pagination: Pagination }
        : T extends HasId
        ? { record: T }
        : T;
}

export type DataCreate<T> = Omit<T, keyof TimeStamp | '_id'>;
