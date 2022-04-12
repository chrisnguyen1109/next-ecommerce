import FeaturedProducts from 'containers/product';
import { ProductC } from 'interfaces';
import { connectDB, getFilterData } from 'lib';
import { Product } from 'models';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface HomePageProps {
    featuredProducts: ProductC[];
}

const HomePage: NextPage<HomePageProps> = ({ featuredProducts }) => {
    return (
        <>
            <Head>
                <title>Ecommerce Website</title>
            </Head>
            <FeaturedProducts products={featuredProducts} />
        </>
    );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    await connectDB();

    const data = await getFilterData(Product, { isFeatured: true });

    return {
        props: {
            featuredProducts: JSON.parse(JSON.stringify(data.records)),
        },
        revalidate: 60 * 60,
    };
};

export default HomePage;
