import { CategoryDB } from './category';
import { HasId } from './common';

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

export type ProductC = Required<ProductDB> & HasId;
