import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Homepage: React.FC = () => {
    return (
        <Container
            disableGutters
            maxWidth="md"
            sx={{
                bgcolor: 'white',
                borderRadius: '20px',
            }}>
            <Paper sx={{ padding: '0', textAlign: 'center', borderRadius: '20px' }}>
                <Box sx={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '320px',
                    '@media (max-width: 768px)': {
                        height: '200px',
                    },
                    '@media (max-width: 480px)': {
                        height: '150px',
                    },
                }}>
                    <img
                        src="https://images.pexels.com/photos/1558690/pexels-photo-1558690.jpeg"
                        alt="To Do App"
                        style={{ maxWidth: '100%', opacity: 0.5, borderRadius: '16px' }}
                    />
                </Box>
                <Box padding="50px">
                    <Typography variant="h4" component="h1" sx={{ margin: '16px 0' }}>
                        Welcome
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ margin: '16px 0' }}>
                        Manage your tasks easily and finally achieve daily goals.
                    </Typography>

                    <Button variant="contained" className="button-gradient" sx={{ m: "20px 0" }}>
                        Get Started
                        <ArrowCircleRightOutlinedIcon sx={{ ml: "10px" }}></ArrowCircleRightOutlinedIcon>
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Homepage;
