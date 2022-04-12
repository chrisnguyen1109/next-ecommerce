import CustomModal from 'components/CustomModal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    CartItem,
    decreaseItem,
    increaseItem,
    removeItem,
} from 'store/cartSlice';
import { useAppDispatch } from 'store/hooks';

interface CartItemProps {
    item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { _id, imageCover, slug, title, quantity, price, inStock } = item;
    const dispatch = useAppDispatch();
    const [showConfirm, setShowConfirm] = useState(false);

    const removeItemHandler = () => {
        dispatch(removeItem(_id));
    };

    const decreaseProduct = () => {
        if (quantity === 1) {
            setShowConfirm(true);
            return;
        }

        dispatch(decreaseItem(_id));
    };

    const increaseProduct = () => {
        if (quantity === inStock) {
            toast.error(
                'The quantity of products demanded exceeds the quantities offered!'
            );
            return;
        }

        dispatch(increaseItem(_id));
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 overflow-auto gap-5">
            <div className="d-flex gap-4 align-items-center ">
                <div
                    className="position-relative mx-0"
                    style={{
                        height: '80px',
                        width: '80px',
                    }}
                >
                    <Image
                        src={imageCover}
                        alt="Image's product"
                        layout="fill"
                        className={
                            'img-thumbnail rounded border-white-image object-fit-cover p-1'
                        }
                    />
                </div>
                <div className="text-ellipsis">
                    <Link href={`/product/${slug}`}>
                        <a className="text-capitalize text-secondary text-decoration-none h4">
                            {title}
                        </a>
                    </Link>

                    <h5 className="text-danger my-2">${quantity * price}</h5>
                    {inStock > 0 ? (
                        <p className="m-0 text-danger fw-normal">
                            In Stock: {inStock}
                        </p>
                    ) : (
                        <p className="m-0 text-danger fw-normal">
                            Out of Stock
                        </p>
                    )}
                </div>
            </div>
            <div className="d-flex gap-4 align-items-center">
                <div className="d-flex gap-3 align-items-center">
                    <Button
                        variant="outline-secondary"
                        onClick={decreaseProduct}
                    >
                        -
                    </Button>
                    <p className="m-0">{quantity}</p>
                    <Button
                        variant="outline-secondary"
                        onClick={increaseProduct}
                    >
                        +
                    </Button>
                </div>
                <FaTrashAlt
                    className="text-danger cursor-pointer"
                    style={{
                        fontSize: '20px',
                    }}
                    onClick={() => setShowConfirm(true)}
                />
            </div>
            <CustomModal
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                title={title}
                onConfirm={() => removeItemHandler()}
            >
                {'Do you want to delete this item?'}
            </CustomModal>
        </ListGroup.Item>
    );
};

export default CartItem;
