import { ProductC } from 'interfaces';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ProductList from './ProductList';

interface FeaturedProductsProps {
    products: ProductC[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
    return (
        <div className="mt-5">
            <h2 className="text-center mb-5">All Featured Products</h2>
            <ProductList products={products} />
            <div className="d-flex justify-content-center my-5">
                <Link href="/product" passHref>
                    <Button variant="outline-info">View all</Button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;
