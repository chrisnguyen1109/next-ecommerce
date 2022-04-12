import Image from 'next/image';
import Link from 'next/link';
import { Button, Col, Row } from 'react-bootstrap';
import { cartCart, cartTotalPrice } from 'store/cartSlice';
import { useAppSelector } from 'store/hooks';
import CartList from './CartList';
import ShippingForm from './ShippingForm';
import { BiArrowBack } from 'react-icons/bi';

const CartDetail: React.FC = () => {
    const cart = useAppSelector(cartCart);
    const totalPrice = useAppSelector(cartTotalPrice);

    if (cart.length === 0) {
        return (
            <>
                <div
                    className="position-relative w-100"
                    style={{ height: '80vh' }}
                >
                    <Image
                        src="/img/empty_cart.jpg"
                        alt="not empty"
                        layout="fill"
                        priority
                        className="object-fit-cover"
                    />
                </div>
                <div className="d-flex flex-column my-3 align-items-center">
                    <p>No item in cart!</p>
                    <Link href="/product" passHref>
                        <Button variant="outline-info">Go shopping</Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mt-3">
                <Link href="/product" passHref>
                    <Button variant="dark" className="text-light">
                        <BiArrowBack /> Keep shopping
                    </Button>
                </Link>
            </div>
            <Row className="mt-5">
                <Col xs={12} md={8} className="text-secondary">
                    <h2 className="text-uppercase">Shopping Cart</h2>
                    <CartList cart={cart} />
                </Col>
                <Col
                    xs={12}
                    md={4}
                    className="text-md-end text-uppercase text-secondary ps-lg-5"
                >
                    <h2>Shipping</h2>
                    <ShippingForm cart={cart} totalPrice={totalPrice} />
                </Col>
            </Row>
        </>
    );
};

export default CartDetail;
