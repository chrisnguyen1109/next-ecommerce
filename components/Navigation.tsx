import { logoutApi } from 'apiClient';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Container,
    Image,
    Nav,
    Navbar,
    NavDropdown,
    Placeholder,
} from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { authCurrentUser, authIsAuthReady, logoutUser } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const CartIcon = dynamic(() => import('./CartIcon'), { ssr: false });

const Navigation: React.FC = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const dispatch = useAppDispatch();
    const isAuthReady = useAppSelector(authIsAuthReady);
    const { mutate, isLoading } = useMutation(logoutApi, {
        onSuccess: data => {
            if (data.message === 'Success') {
                dispatch(logoutUser());
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
                    <CartIcon />
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
                                alt="avatar"
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
