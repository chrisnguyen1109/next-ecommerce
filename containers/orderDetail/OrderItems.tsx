import { ProductDB } from 'interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';

interface OrderItemsProps {
    cart: { quantity: number; product: ProductDB }[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ cart }) => {
    return (
        <>
            <h3 className="my-3 text-secondary">Order items</h3>
            <ListGroup variant="flush" className="my-4">
                {cart.map(
                    ({
                        quantity,
                        product: { slug, imageCover, title, price },
                    }) => (
                        <ListGroup.Item
                            key={slug}
                            className="d-flex justify-content-between align-items-center py-2 overflow-auto gap-5"
                        >
                            <div className="d-flex gap-4 align-items-center ">
                                <div
                                    className="position-relative mx-0"
                                    style={{
                                        height: '50px',
                                        width: '50px',
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
                                </div>
                            </div>
                            <div className="text-info m-0 h6">
                                {quantity} x ${price} = ${price * quantity}
                            </div>
                        </ListGroup.Item>
                    )
                )}
            </ListGroup>
        </>
    );
};

export default OrderItems;
