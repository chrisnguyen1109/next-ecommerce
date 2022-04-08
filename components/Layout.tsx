import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navigation />
            <main className="container">{children}</main>
        </>
    );
};

export default Layout;
