import { OrderC } from 'interfaces';
import { formatDate, formatMobile } from 'lib';
import { Alert } from 'react-bootstrap';
import OrderItems from './OrderItems';

interface OrderInforProps {
    order: OrderC;
}

const OrderInfor: React.FC<OrderInforProps> = ({ order }) => {
    const {
        _id,
        address,
        mobile,
        user: { name, email },
        delivery,
        paid,
        paymentDate,
        paymentId,
        cart,
    } = order;

    return (
        <div className="text-uppercase">
            <h2 className="text-break">Order {_id}</h2>
            <div className="mt-4 text-secondary">
                <h3 className="my-3">Shipping</h3>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Address: {address}</p>
                <p>Mobile: {formatMobile(mobile)}</p>
                <p>Delivery: {delivery}</p>
                <h3 className="my-3">Payment</h3>
                {paid && (
                    <>
                        <p>Method: Paypal</p>
                        <p>PaymentId: {paymentId}</p>
                    </>
                )}
                {!paid ? (
                    <Alert variant="danger">Not paid</Alert>
                ) : (
                    <Alert variant="success">
                        Paid on {formatDate(paymentDate!)}
                    </Alert>
                )}
            </div>
            <OrderItems cart={cart} />
        </div>
    );
};

export default OrderInfor;
