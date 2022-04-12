import { FastField, FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

type FormSelectProps = {
    name: string;
    label?: string;
    text?: string;
    titleOption?: string;
    options: { value: string | number; key: string }[];
} & React.ComponentProps<typeof Form.Select>;

const FormSelect: React.FC<FormSelectProps> = ({
    name,
    label,
    text,
    titleOption,
    children,
    options,
    ...rest
}) => {
    return (
        <FastField name={name}>
            {({ field, form }: FieldProps) => (
                <Form.Group controlId={name} className="mb-3">
                    {label && <Form.Label>{label}</Form.Label>}
                    <Form.Select
                        isInvalid={!!(form.errors[name] && form.touched[name])}
                        {...field}
                        {...rest}
                    >
                        <option>{`--- ${(
                            titleOption || 'Select an option'
                        ).toUpperCase()} ---`}</option>
                        {options.map(({ key, value }) => (
                            <option key={value} value={value}>
                                {key}
                            </option>
                        ))}
                    </Form.Select>
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

export default FormSelect;
