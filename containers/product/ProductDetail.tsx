import { ProductC } from 'interfaces';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ImageSlide from './ImageSlide';

interface ProductDetailProps {
    product: ProductC;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const {
        title,
        price,
        inStock,
        sold,
        category: { name },
        content,
        description,
        imageCover,
        images,
    } = product;

    const [activeImage, setActiveImage] = useState<string>(imageCover);
    const [active, setActive] = useState<number>(0);

    const slideImages = [imageCover, ...images];

    const setImageActive = (index: number) => {
        setActive(index);
        setActiveImage(slideImages[index]);
    };

    const productStock = () => {
        return inStock > 0 ? (
            <h5 className="text-danger">In Stock: {inStock}</h5>
        ) : (
            <h5 className="text-danger">Out of Stock</h5>
        );
    };

    return (
        <Row xs={1} lg={2} className="mt-5 gy-3 gy-lg-0">
            <Col>
                <div
                    className="position-relative mb-2"
                    style={{ height: '350px' }}
                >
                    <Image
                        src={activeImage}
                        alt="Image's product"
                        layout="fill"
                        className="img-thumbnail rounded border-white-image p-1"
                        priority
                    />
                </div>
                <ImageSlide
                    active={active}
                    setImageActive={setImageActive}
                    slideImages={slideImages}
                />
            </Col>
            <Col>
                <h2 className="text-uppercase mb-4">{title}</h2>
                <h3 className="text-danger my-2">${price}</h3>
                <div className="d-flex justify-content-between my-2">
                    {productStock()}
                    <h5 className="text-danger">Sold: {sold}</h5>
                </div>
                <h6 className="my-2 text-capitalize">Category: {name}</h6>
                <div className="my-2 lead">{description}</div>
                <div className="my-2 text-muted text-justify">{content}</div>
                <Button variant="dark my-3 px-5 text-white">Buy</Button>
            </Col>
        </Row>
    );
};

export default ProductDetail;
