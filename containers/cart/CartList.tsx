import { ListGroup } from 'react-bootstrap';
import { CartItem as CartItemI } from 'store/cartSlice';
import CartItem from './CartItem';

interface CartListProps {
    cart: CartItemI[];
}

const CartList: React.FC<CartListProps> = ({ cart }) => {
    return (
        <ListGroup variant="flush" className="border-top border-bottom my-4">
            {cart.map(item => (
                <CartItem key={item._id} item={item} />
            ))}
        </ListGroup>
    );
};

export default CartList;
