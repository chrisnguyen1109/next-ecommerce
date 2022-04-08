import { FastField, FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

type FormInputProps = {
    name: string;
    label?: string;
    text?: string;
} & React.ComponentProps<typeof Form.Control>;

const FormInput: React.FC<FormInputProps> = ({
    name,
    label,
    text,
    children,
    ...rest
}) => {
    return (
        <FastField name={name}>
            {({ field, form }: FieldProps) => (
                <Form.Group controlId={name} className="mb-3">
                    {label && <Form.Label>{label}</Form.Label>}
                    <Form.Control
                        {...field}
                        {...rest}
                        isInvalid={!!(form.errors[name] && form.touched[name])}
                    />
                    {text && (
                        <Form.Text className="text-muted">{text}</Form.Text>
                    )}
                    <Form.Control.Feedback type="invalid">
                        {form.errors[name]}
                    </Form.Control.Feedback>
                </Form.Group>
            )}
        </FastField>
    );
};

export default FormInput;
