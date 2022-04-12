import { ReactNode } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface CustomModalProps {
    title?: string;
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    closeContent?: string;
    confirmContent?: string;
    children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
    onClose,
    show,
    children,
    closeContent,
    confirmContent,
    title,
    onConfirm,
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            {title && (
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onClose}>
                    {closeContent || 'Cancel'}
                </Button>
                <Button variant="outline-info" onClick={onConfirm}>
                    {confirmContent || 'Confirm'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
