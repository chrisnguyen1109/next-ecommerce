import ProductList from 'containers/product/ProductList';
import { ProductC } from 'interfaces';
import { connectDB, getFilterData } from 'lib';
import { Product } from 'models';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface ProductPageProps {
    products: ProductC[];
}

const ProductPage: NextPage<ProductPageProps> = ({ products }) => {
    return (
        <>
            <Head>
                <title>Ecommerce Website</title>
            </Head>
            <ProductList products={products} />
        </>
    );
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async () => {
    await connectDB();

    const data = await getFilterData(Product, {});

    return {
        props: {
            products: JSON.parse(JSON.stringify(data.records)),
        },
        revalidate: 60 * 60,
    };
};

export default ProductPage;
