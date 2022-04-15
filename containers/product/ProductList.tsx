import { CallBack, ProductC } from 'interfaces';
import { Col, Row } from 'react-bootstrap';
import ProductItem from './ProductItem';

interface ProductListProps {
    products: ProductC[];
    infiniteScrollRef?: CallBack;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    infiniteScrollRef,
}) => {
    return (
        <>
            {products.length === 0 && (
                <p className="text-center mt-5">
                    Store is currently empty. Please come back later!
                </p>
            )}
            {products.length > 0 && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product, index) => (
                        <Col
                            key={product._id}
                            className="d-flex justify-content-center"
                            ref={
                                products.length === index + 1 &&
                                infiniteScrollRef
                                    ? infiniteScrollRef
                                    : undefined
                            }
                        >
                            <ProductItem product={product} index={index} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default ProductList;
