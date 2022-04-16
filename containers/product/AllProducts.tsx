import LoadingSpinner from 'components/LoadingSpinner';
import {
    useComponentDidUpdate,
    useFirstRender,
    useInfiniteScroll,
    useProducts,
} from 'hooks';
import { CategoryC, ProductC, ProductQuery } from 'interfaces';
import { DEFAULT_LIMIT } from 'lib';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import FilterForm from './FilterForm';
import ProductList from './ProductList';

interface AllProductsProps {
    products: ProductC[];
    categories: CategoryC[];
}

const AllProducts: React.FC<AllProductsProps> = ({ products, categories }) => {
    const router = useRouter();

    const [filter, setFilter] = useState<ProductQuery>({
        ...router.query,
    });
    const firstFilterRef = useRef<boolean>(false);
    const { data, isLoading } = useProducts(filter, firstFilterRef.current);
    const [productList, setProductList] = useState<ProductC[]>(products);

    const hasMore = data?.data?.pagination
        ? data.data.pagination.total_records > productList.length
        : false;

    const infiniteScrollRef = useInfiniteScroll(() => {
        setFilter(prev => ({
            ...prev,
            limit: +(prev.limit || DEFAULT_LIMIT) + DEFAULT_LIMIT,
        }));
    }, hasMore);

    useEffect(() => {
        data?.data?.records && setProductList(data?.data?.records);
    }, [data?.data?.records]);

    useComponentDidUpdate(() => {
        router.push(`/product?${queryString.stringify(filter)}`, undefined, {
            shallow: true,
        });
        firstFilterRef.current = true;
    }, [filter]);

    return (
        <div className="mb-5">
            <FilterForm
                categories={categories}
                filter={filter}
                setFilter={setFilter}
            />

            <ProductList
                products={productList}
                infiniteScrollRef={infiniteScrollRef}
            />
            {isLoading && (
                <div className="my-3">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
};

export default AllProducts;
