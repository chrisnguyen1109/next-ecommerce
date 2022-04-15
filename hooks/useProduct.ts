import {
    ProductC,
    ProductCreate,
    ProductQuery,
    ProductResponseData,
    ProductResponseList,
} from 'interfaces';
import initialCustomQuery, { Feature } from './useCustomQuery';

class ProductClass implements Feature {
    constructor(
        public readonly service: string,
        public readonly queryKey: string
    ) {}
}

const productInstance = new ProductClass('/product', 'product_list');

export const {
    useItem: useProduct,
    useList: useProducts,
    useCreateItem: useCreateProduct,
    useUpdateItem: useUpdateProduct,
    useDeleteItem: useDeleteProduct,
} = initialCustomQuery<
    ProductC,
    ProductResponseData,
    ProductResponseList,
    ProductQuery,
    ProductCreate
>(productInstance);
