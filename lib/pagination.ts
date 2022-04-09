import { Pagination } from 'interfaces';
import { Document } from 'mongoose';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;

export const getPagination = (
    queryObject: Record<string, any>,
    document: Document[],
    total_records: number
): Pagination => {
    const page = +queryObject.page || DEFAULT_PAGE;
    const limit = +queryObject.limit || DEFAULT_LIMIT;
    const total_page = Math.ceil(total_records / limit);

    return {
        page,
        limit,
        records: document.length,
        total_records,
        total_page,
    };
};
