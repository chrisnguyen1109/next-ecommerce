import { Button } from 'react-bootstrap';

interface DynamicBtnProps {
    handleClick: () => void;
    disableCondition: boolean;
    content: string;
}

const DynamicBtn: React.FC<DynamicBtnProps> = ({
    handleClick,
    disableCondition,
    content,
}) => {
    return (
        <Button
            className="w-50"
            variant="success"
            onClick={handleClick}
            disabled={disableCondition}
        >
            {content}
        </Button>
    );
};

export default DynamicBtn;
