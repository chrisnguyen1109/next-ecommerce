import PaypalButton from 'components/PaypalButton';
import { useOrder } from 'hooks';
import { useRouter } from 'next/router';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import OrderInfor from './OrderInfor';

const OrderDetail: React.FC = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const { data, isLoading, error } = useOrder(id);

    const hasOrder = !isLoading && !error && data?.data?.record;

    return (
        <div className="my-3">
            <div>
                <Button
                    variant="dark"
                    className="text-white"
                    onClick={() => router.back()}
                >
                    <BiArrowBack />
                    Go Back
                </Button>
            </div>
            {isLoading && (
                <div className="my-5 w-100 text-center">
                    <Spinner
                        animation="grow"
                        variant="secondary"
                        className="mx-3"
                    />
                    <Spinner
                        animation="grow"
                        variant="secondary"
                        className="mx-3"
                    />
                    <Spinner
                        animation="grow"
                        variant="secondary"
                        className="mx-3"
                    />
                </div>
            )}
            {id && !isLoading && !data?.data?.record && (
                <div className="my-5 w-100 text-center h5">
                    No order with this id: {id} 😢
                </div>
            )}
            {hasOrder && (
                <Row className="mt-5">
                    <Col xs={12} md={8} className="px-5">
                        <OrderInfor order={data.data!.record} />
                    </Col>
                    <Col xs={12} md={4} className="px-5">
                        <h2 className="mb-4 text-uppercase">
                            Total: ${data.data?.record.total}
                        </h2>
                        {!data.data?.record.paid && (
                            <PaypalButton
                                amount={data.data!.record.total}
                                orderId={id}
                            />
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default OrderDetail;
