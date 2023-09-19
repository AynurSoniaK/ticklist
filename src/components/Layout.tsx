import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from '@mui/material/Container';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Container 
                disableGutters
                maxWidth="lg"
                sx={{ 
                    bgcolor:"white",
                    borderRadius: '20px',
                    paddingBottom: '30px',
                    }}>
                <Header />
                <Container>{children}</Container>
                {/* <Footer /> */}
            </Container>
        </>
    );
};

export default Layout;
