import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from '@mui/material/Container';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Container
            className='container'
            disableGutters
            maxWidth="lg"
            sx={{
                bgcolor: "white",
                borderRadius: '20px',
                paddingBottom: '30px',
                marginTop:'20px'
            }}>
            <Header />
            <Container>{children}</Container>
            {/* <Footer /> */}
        </Container>
    );
};

export default Layout;
