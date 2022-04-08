import { logout } from 'apiClient';
import { PROTECTED_ROUTE } from 'lib/protectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Badge,
    Container,
    Image,
    Nav,
    Navbar,
    NavDropdown,
    Placeholder,
} from 'react-bootstrap';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { authCurrentUser, authIsAuthReady, logoutUser } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const Navigation: React.FC = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const dispatch = useAppDispatch();
    const isAuthReady = useAppSelector(authIsAuthReady);
    const { mutate, isLoading } = useMutation(logout, {
        onSuccess: data => {
            if (data.message === 'Success') {
                dispatch(logoutUser());

                if (PROTECTED_ROUTE.includes(pathname)) {
                    router.replace('/signin');
                }
            }
        },
    });
    const userSession = useAppSelector(authCurrentUser);

    const logoutHandler = () => {
        mutate();
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand>Next Ecommerce</Navbar.Brand>
                </Link>
                <Nav className="align-items-center">
                    <Link href="/cart" passHref>
                        <Nav.Link className="d-flex align-items-center gap-1">
                            <div className="d-flex position-relative">
                                <AiOutlineShoppingCart size="20" />
                                <Badge
                                    bg="success"
                                    pill
                                    className="position-absolute top-0 start-100 translate-middle"
                                    style={{ opacity: 0.8 }}
                                >
                                    0
                                </Badge>
                            </div>
                            Cart
                        </Nav.Link>
                    </Link>
                    {!userSession &&
                        (isAuthReady ? (
                            <Link href="/signin" passHref>
                                <Nav.Link className="d-flex align-items-center gap-1">
                                    <AiOutlineUser size="20" />
                                    Signin
                                </Nav.Link>
                            </Link>
                        ) : (
                            <Placeholder
                                animation="wave"
                                style={{ width: '80px', height: '18px' }}
                                bg="secondary"
                            ></Placeholder>
                        ))}
                    {userSession && (
                        <div className="d-flex align-items-center ms-2">
                            <Image
                                src={userSession.avatar}
                                alt="avatr"
                                roundedCircle
                                width={30}
                                height={30}
                            />
                            <div>
                                <Navbar.Toggle aria-controls="navbar-dark-example" />
                                <Navbar.Collapse id="navbar-dark-example">
                                    <Nav>
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title={userSession.name}
                                            menuVariant="dark"
                                        >
                                            <Link href="/profile" passHref>
                                                <NavDropdown.Item
                                                    className="text-white text-decoration-none"
                                                    active={
                                                        pathname === '/profile'
                                                    }
                                                >
                                                    Profile
                                                </NavDropdown.Item>
                                            </Link>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={logoutHandler}
                                                disabled={isLoading}
                                            >
                                                {isLoading
                                                    ? 'Logging out...'
                                                    : 'Logout'}
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </div>
                        </div>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
