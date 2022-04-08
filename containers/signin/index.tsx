import { signin } from 'apiClient';
import FormInput from 'components/FormInput';
import { Form, Formik } from 'formik';
import { User } from 'interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { loginUser } from 'store/authSlice';
import { useAppDispatch } from 'store/hooks';
import * as Yup from 'yup';

export type SigninForm = Pick<User, 'email'> & {
    password: string;
};

const Signin: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { mutate, isLoading } = useMutation(signin, {
        onSuccess: data => {
            if (data.message === 'Success') {
                dispatch(loginUser(data.data.user));
                router.replace('/');
            }
        },
    });

    const initialValues: SigninForm = {
        email: '',
        password: '',
    };

    const validationSchema: Yup.SchemaOf<SigninForm> = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'You have to enter at least 6 digit!'),
    });

    const onSubmit = async (data: SigninForm) => {
        mutate({ ...data });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Form
                        className="mx-auto my-4"
                        style={{ maxWidth: '500px' }}
                    >
                        <FormInput
                            name="email"
                            label="Email"
                            type="email"
                            text="We'll never share your email with anyone else."
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <Button
                            variant="dark"
                            type="submit"
                            className="w-100"
                            disabled={!formik.isValid || isLoading}
                        >
                            {isLoading ? (
                                <Spinner animation="border" />
                            ) : (
                                'Log in'
                            )}
                        </Button>
                        <p className="my-2">
                            You don&apos;t have an account?{' '}
                            <Link href="/register">
                                <a
                                    className="text-decoration-none"
                                    style={{ color: 'crimson' }}
                                >
                                    Register Now
                                </a>
                            </Link>
                        </p>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Signin;
