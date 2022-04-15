import { Spinner } from 'react-bootstrap';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="text-center">
            <Spinner
                animation="grow"
                variant="secondary"
                className="mx-3"
                size="sm"
            />
            <Spinner
                animation="grow"
                variant="secondary"
                className="mx-3"
                size="sm"
            />
            <Spinner
                animation="grow"
                variant="secondary"
                className="mx-3"
                size="sm"
            />
        </div>
    );
};

export default LoadingSpinner;
