import { getMeApi } from 'apiClient';
import { formatDate, formatMobile } from 'lib';
import { Spinner, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import LoadingSpinner from 'components/LoadingSpinner';

const UserOrders: React.FC = () => {
    const { data, isLoading, error } = useQuery('my_orders', () =>
        getMeApi({ payload: { orders: true } })
    );

    const hasOrders =
        !isLoading &&
        !error &&
        data?.data?.user.orders &&
        data.data.user.orders.length > 0;

    const orders = data?.data?.user.orders;

    return (
        <>
            <h3 className="text-uppercase mb-4">Your Orders</h3>
            <Table bordered hover responsive className="text-uppercase w-100">
                <thead className="bg-light">
                    <tr>
                        <th>Id</th>
                        <th>Addess</th>
                        <th>Mobile</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Delivery</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody className="cursor-pointer border-top-0">
                    {hasOrders &&
                        orders?.map(
                            ({
                                _id,
                                address,
                                mobile,
                                total,
                                paymentDate,
                                delivery,
                                paid,
                            }) => (
                                <tr key={_id}>
                                    <td className="p-3 text-nowrap">
                                        <Link href={`order/${_id}`}>
                                            <a className="text-decoration-none text-secondary">
                                                {_id}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {address}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {formatMobile(mobile)}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        ${total}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {paid
                                            ? formatDate(paymentDate!)
                                            : 'Not paid'}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {delivery}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {paid ? (
                                            <FaCheck className="text-success" />
                                        ) : (
                                            <FaTimes className="text-danger" />
                                        )}
                                    </td>
                                </tr>
                            )
                        )}
                    {isLoading && (
                        <tr className="text-center table-info">
                            <td colSpan={7}>
                                <LoadingSpinner />
                            </td>
                        </tr>
                    )}
                    {orders?.length === 0 && (
                        <tr className="text-center table-danger">
                            <td colSpan={7}>No order found!</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default UserOrders;
