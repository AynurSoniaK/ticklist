import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';

function Login() {

  return (
    <Layout>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        minHeight="70vh">
        <Typography variant="h4" component="h1" gutterBottom margin={4} color="secondary">
          Create your profile
        </Typography>
        <form>
          <Box marginBottom={3}>
            <TextField
              label="Nom d'utilisateur"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              label="Email"
              type="password"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
            />
          </Box>
        </form>
        <Box margin={3}>
          <Button variant="contained" color="primary" className='button-gradient' sx={{ p: "10px 20px" }}>
            Start ticking !
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
