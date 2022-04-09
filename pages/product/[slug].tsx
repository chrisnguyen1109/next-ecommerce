import ProductDetail from 'containers/product/ProductDetail';
import { ProductC } from 'interfaces';
import { connectDB, textCapitalize } from 'lib';
import { Product } from 'models';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface ProductDetailPageProps {
    product: ProductC;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
    return (
        <>
            <Head>
                <title>{`Product Detail - ${textCapitalize(
                    product.title
                )}`}</title>
            </Head>
            <ProductDetail product={product} />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    await connectDB();

    const featureProduct = await Product.find({ isFeatured: true });
    const paths = featureProduct.map(product => ({
        params: { slug: product.slug },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({
    params,
}) => {
    await connectDB();

    const slug = params!.slug;

    const product = await Product.findOne({ slug });
    if (!product?._id) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
        revalidate: 60 * 60,
    };
};

export default ProductDetailPage;
