import { CategoryDB } from './category';

export interface ProductDB {
    title: string;
    slug: string;
    price: number;
    description: string;
    content: string;
    imageCover: string;
    images?: string[];
    checked?: boolean;
    inStock?: number;
    sold?: number;
    category: CategoryDB;
}
