import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { Form, Formik } from 'formik';
import { useCreateOrder } from 'hooks';
import { Delivery, DELIVERY_OPTIONS } from 'interfaces';
import { formatMobile } from 'lib';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { authCurrentUser } from 'store/authSlice';
import { CartItem, clearCart } from 'store/cartSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup';

interface ShippingFormProps {
    cart: CartItem[];
    totalPrice: number;
}

export interface ShippingFormI {
    address: string;
    mobile: string;
    delivery: Delivery;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ cart, totalPrice }) => {
    const router = useRouter();
    const currentUser = useAppSelector(authCurrentUser);
    const dispatch = useAppDispatch();
    const { mutate, isLoading } = useCreateOrder({
        onSuccess: response => {
            if (response.message === 'Success' && response.data?.record) {
                toast.success('Create order successfully!');
                dispatch(clearCart());
                router.push(`/order/${response.data.record._id}`);
            }
        },
    });

    const initialValues: ShippingFormI = {
        address: '',
        mobile: '',
        delivery: '' as Delivery,
    };

    const validationSchema: Yup.SchemaOf<ShippingFormI> = Yup.object({
        address: Yup.string().required('Address is required'),
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Phone number is not valid'
            ),
        delivery: Yup.mixed()
            .oneOf(
                Object.values(Delivery),
                'Delivery is either: standard shipping, priority shpping or no shipping!'
            )
            .required('Delivery is required'),
    });

    const mobileChangeHandler = (value: string | number) => {
        return formatMobile(value);
    };

    const onSubmit = async (data: ShippingFormI) => {
        if (!currentUser) {
            toast.error('You need to login to create an order!');
            return;
        }

        mutate({
            ...data,
            mobile: data.mobile.replaceAll('-', ''),
            cart: cart.map(item => ({
                quantity: item.quantity,
                product: item._id,
            })),
            total: totalPrice,
            user: currentUser._id,
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Form className="my-4 ms-md-auto">
                        <FormInput name="address" label="Address" />
                        <FormInput
                            name="mobile"
                            label="Mobile"
                            onInputChange={mobileChangeHandler}
                        />
                        <FormSelect
                            name="delivery"
                            label="Delivery"
                            titleOption="Select delivery"
                            options={DELIVERY_OPTIONS}
                        />
                        <h3>
                            Total:{' '}
                            <span className="text-danger">${totalPrice}</span>
                        </h3>
                        <Button
                            variant="dark"
                            type="submit"
                            className="text-uppercase my-3"
                            disabled={!formik.isValid || isLoading}
                        >
                            {isLoading ? (
                                <Spinner animation="border" />
                            ) : (
                                'Proceed with payment'
                            )}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ShippingForm;
