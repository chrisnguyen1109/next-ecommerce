import { registerApi } from 'apiClient';
import FormInput from 'components/FormInput';
import { Form, Formik } from 'formik';
import { UserC } from 'interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { loginUser } from 'store/authSlice';
import { useAppDispatch } from 'store/hooks';
import * as Yup from 'yup';

export type RegisterForm = Pick<UserC, 'name' | 'email'> & {
    password: string;
    confirmPassword: string;
};

const Register: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { mutate, isLoading } = useMutation(registerApi, {
        onSuccess: data => {
            if (data.message === 'Success' && data.data?.user) {
                dispatch(loginUser(data.data.user));
                router.replace('/');
            }
        },
    });

    const initialValues: RegisterForm = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema: Yup.SchemaOf<RegisterForm> = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .test('valid-name', 'Please enter at least 2 words', value => {
                if (!value) return true;

                const valueArray = value.split(' ');
                return !!(valueArray[0] && valueArray[1]);
            }),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'You have to enter at least 6 digit'),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref('password'), ''],
                'Confirm passwords must match to password'
            )
            .required('Required'),
    });

    const onSubmit = (data: RegisterForm) => {
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
                        <FormInput name="name" label="Name" type="text" />
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
                        <FormInput
                            name="confirmPassword"
                            label="Confirm Password"
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
                                'Register'
                            )}
                        </Button>
                        <p className="my-2">
                            Already have an account?{' '}
                            <Link href="/signin">
                                <a
                                    className="text-decoration-none"
                                    style={{ color: 'crimson' }}
                                >
                                    Login Now
                                </a>
                            </Link>
                        </p>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Register;
