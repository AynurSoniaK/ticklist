import { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

type LayoutProps = {
    children: ReactNode;
}

const LayoutNotLogged: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Grid
            margin={5}>
            <Container
                className='container'
                disableGutters
                maxWidth="md"
                sx={{
                    display: 'flex',
                    alignItems: 'middle', // Vertical centering
                    justifyContent: 'start', // Horizontal centering
                    bgcolor: 'white',
                    borderRadius: '20px',
                }}>
                <Container disableGutters>
                    {children}
                </Container>
            </Container>
        </Grid>
    );
};

export default LayoutNotLogged;
