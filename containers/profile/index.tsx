import { Col, Row } from 'react-bootstrap';
import ProfileForm from './ProfileForm';
import UserOrders from './UserOrders';

const Profile: React.FC = () => {
    return (
        <Row className="mt-3 mb-5 gy-5">
            <Col xs={12} lg={4}>
                <ProfileForm />
            </Col>
            <Col xs={12} lg={8}>
                <UserOrders />
            </Col>
        </Row>
    );
};

export default Profile;
