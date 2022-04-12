import Link from 'next/link';
import { Badge, Nav } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { cartCart } from 'store/cartSlice';
import { useAppSelector } from 'store/hooks';

const CartIcon: React.FC = () => {
    const cart = useAppSelector(cartCart);

    return (
        <Link href="/cart" passHref>
            <Nav.Link className="d-flex align-items-center gap-1">
                <div className="d-flex position-relative">
                    <AiOutlineShoppingCart size="20" />
                    <Badge
                        bg="success"
                        pill
                        className="position-absolute top-0 start-100 translate-middle opacity-75"
                    >
                        {cart.length}
                    </Badge>
                </div>
                Cart
            </Nav.Link>
        </Link>
    );
};

export default CartIcon;
