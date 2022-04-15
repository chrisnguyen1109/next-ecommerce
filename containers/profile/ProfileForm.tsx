import { updateMeApi, uploadAvatar } from 'apiClient';
import FormInput from 'components/FormInput';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { authCurrentUser, loginUser } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup';
import UserAvatar from './UserAvatar';

export interface UpdateProfileForm {
    avatar: string;
    avatarFie?: File | null;
    name: string;
    email: string;
    password?: string;
    newPassword?: string;
}

const ProfileForm: React.FC = () => {
    const currentUser = useAppSelector(authCurrentUser);
    const dispatch = useAppDispatch();

    const { mutate } = useMutation(updateMeApi, {
        onSuccess(response) {
            if (response.message === 'Success' && response.data?.user) {
                toast.success('Update profile successfully!');
                dispatch(loginUser(response.data.user));
            }
        },
    });

    const initialValues: UpdateProfileForm = {
        avatar: currentUser?.avatar || '',
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        password: '',
        newPassword: '',
    };

    const validationSchema: Yup.SchemaOf<UpdateProfileForm> = Yup.object({
        avatar: Yup.string().required('Avatar is required'),
        avatarFie: Yup.mixed(),
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
        password: Yup.string().when('newPassword', {
            is: (newPassword: string) => newPassword?.trim().length > 0,
            then: Yup.string().required('Password is required'),
        }),
        newPassword: Yup.string().min(6, 'You have to enter at least 6 digit'),
    });

    const onSubmit = async (
        data: UpdateProfileForm,
        formHelper: FormikHelpers<UpdateProfileForm>
    ) => {
        try {
            formHelper.setSubmitting(true);

            if (data.avatarFie) {
                const responseUpload = await uploadAvatar(data.avatarFie);

                data.avatar = responseUpload.secure_url;
            }

            mutate({ ...data, avatarFie: undefined });
        } catch (error: any) {
            console.error(error);
        } finally {
            formHelper.setSubmitting(false);
        }
    };

    return (
        <>
            <h3 className="text-uppercase">User Profile</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {formik => {
                    const { setFieldValue, isSubmitting } = formik;

                    return (
                        <Form>
                            <UserAvatar setFieldValue={setFieldValue} />
                            <FormInput name="name" label="Name" />
                            <FormInput
                                name="email"
                                label="Email"
                                type="email"
                                readOnly
                            />
                            <FormInput
                                name="password"
                                label="Current Password"
                                type="password"
                            />
                            <FormInput
                                name="newPassword"
                                label="New Password"
                                type="password"
                            />
                            <Button
                                type="submit"
                                variant="info"
                                className="text-white"
                                disabled={!formik.isValid || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <Spinner animation="border" />
                                ) : (
                                    'Update'
                                )}
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default ProfileForm;
