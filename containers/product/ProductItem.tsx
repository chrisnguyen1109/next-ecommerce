import { ProductC } from 'interfaces';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Placeholder } from 'react-bootstrap';
import { addItem, cartCart } from 'store/cartSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const DynamicBtn = dynamic(() => import('components/DynamicBtn'), {
    ssr: false,
    loading: () => (
        <Placeholder.Button
            variant="success"
            animation="glow"
            className="w-50"
        />
    ),
});

interface ProductItemProps {
    product: ProductC;
    index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, index }) => {
    const { _id, title, price, inStock, description, imageCover, slug } =
        product;
    const dispatch = useAppDispatch();
    const cart = useAppSelector(cartCart);
    const itemExist = !!cart.find(el => el._id === _id);

    const productStock = () => {
        return inStock > 0 ? (
            <h5 className="text-danger">In Stock: {inStock}</h5>
        ) : (
            <h5 className="text-danger">Out of Stock</h5>
        );
    };

    const addToCart = () => {
        if (itemExist || inStock === 0) return;

        dispatch(addItem(product));
    };

    return (
        <Card>
            <div
                className="position-relative card-img-top"
                style={{ height: '250px' }}
            >
                <Image
                    src={imageCover}
                    layout="fill"
                    alt="image's product"
                    priority={index >= 1 || index <= 6}
                    className="object-fit-cover"
                />
            </div>
            <Card.Body>
                <Card.Title className="text-capitalize">{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className="d-flex justify-content-between my-3">
                    <h5 className="text-danger">${price}</h5>
                    {productStock()}
                </div>
                <div className="d-flex gap-4">
                    <Link href={`/product/${slug}`} passHref>
                        <Button className="w-50 text-light" variant="info">
                            View
                        </Button>
                    </Link>

                    <DynamicBtn
                        handleClick={addToCart}
                        disableCondition={itemExist || !inStock}
                        content={itemExist ? 'Added to cart' : 'Buy'}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
