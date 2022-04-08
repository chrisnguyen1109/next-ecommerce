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
    user?: UserDB & { _id: string };
};
