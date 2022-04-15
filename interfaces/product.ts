import { CategoryDB } from './category';
import {
    DataCreate,
    HasId,
    QueryParms,
    ResponseData,
    TimeStamp,
} from './common';

export interface ProductDB {
    title: string;
    slug: string;
    price: number;
    description: string;
    content: string;
    imageCover: string;
    isFeatured?: boolean;
    images?: string[];
    checked?: boolean;
    inStock?: number;
    sold?: number;
    category: CategoryDB;
}

export type ProductC = Required<ProductDB> & HasId & TimeStamp;

export type ProductCreate = DataCreate<ProductC>;

export type ProductResponseData = ResponseData<ProductC>;

export type ProductResponseList = ResponseData<ProductC[]>;

export type ProductFields = 'createdAt' | 'price' | 'stock';
export interface ProductFilter {
    search: string;
    category: string;
}

export type ProductQuery = Partial<QueryParms<ProductFields> & ProductFilter>;
