import { ProductC } from 'interfaces';
import Link from 'next/link';
import { Button, Col, Row } from 'react-bootstrap';
import ProductItem from './ProductItem';

interface ProductListProps {
    products: ProductC[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="mt-5">
            <h2 className="text-center mb-5">All Featured Products</h2>
            {products.length === 0 && (
                <p className="text-center mt-5">
                    Store is currently empty. Please come back later!
                </p>
            )}
            {products.length > 0 && (
                <>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map((product, index) => (
                            <Col
                                key={product._id}
                                className="d-flex justify-content-center"
                            >
                                <ProductItem product={product} index={index} />
                            </Col>
                        ))}
                    </Row>
                    <div className="d-flex justify-content-center my-5">
                        <Link href="/product" passHref>
                            <Button variant="outline-info">Load more</Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
