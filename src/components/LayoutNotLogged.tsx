import { ReactNode } from 'react';
import Container from '@mui/material/Container';

interface LayoutProps {
    children: ReactNode;
}

const LayoutNotLogged: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Container 
                disableGutters
                maxWidth="md"
                sx={{ 
                    bgcolor:"white",
                    borderRadius: '20px', 
                    }}>
                <Container>{children}</Container>
            </Container>
        </>
    );
};

export default LayoutNotLogged;
