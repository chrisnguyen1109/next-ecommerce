import { useUpdateOrder } from 'hooks';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

declare const paypal: any;

interface PaypalButtonProps {
    amount: number;
    orderId: string;
}

const PaypalButton: React.FC<PaypalButtonProps> = ({ amount, orderId }) => {
    const paypalBtnRef = useRef<HTMLDivElement>(null);
    const { mutate } = useUpdateOrder({
        onSuccess(response) {
            if (response.message === 'Success' && response.data?.record) {
                toast.success('Payment successfully!');
            }
        },
    });

    useEffect(() => {
        paypal
            .Buttons({
                createOrder: (_: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (_data: any, actions: any) => {
                    const order = await actions.order.capture();

                    mutate({
                        id: orderId,
                        body: {
                            paid: true,
                            paymentId: order.payer.payer_id,
                            paymentDate: order.create_time,
                        },
                    });
                },
                onError: (error: any) => {
                    toast.error(
                        error.message && typeof error.message === 'string'
                            ? error.message
                            : 'Payment failed please try again!'
                    );
                },
            })
            .render(paypalBtnRef.current);
    }, []);

    return <div ref={paypalBtnRef}></div>;
};

export default PaypalButton;
