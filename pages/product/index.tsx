import AllProducts from 'containers/product/AllProducts';
import { CategoryC, ProductC } from 'interfaces';
import { connectDB, getFilterData } from 'lib';
import { Category, Product } from 'models';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface ProductPageProps {
    products: ProductC[];
    categories: CategoryC[];
}

const ProductPage: NextPage<ProductPageProps> = ({ products, categories }) => {
    return (
        <>
            <Head>
                <title>All Products</title>
            </Head>
            <AllProducts products={products} categories={categories} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<
    ProductPageProps
> = async ctx => {
    await connectDB();

    const [data, categories] = await Promise.all([
        getFilterData(Product, { ...ctx.query }, 'title', 'description'),
        Category.find(),
    ]);

    return {
        props: {
            products: JSON.parse(JSON.stringify(data.records)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
};

export default ProductPage;
