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
        margin={5}
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center">
        <Typography variant="h4" gutterBottom margin={3}>
          Connexion
        </Typography>
        <form>
          <Box marginBottom={3} sx={{ borderRadius: "15px"}}>
            <TextField
              label="Nom d'utilisateur"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              label="Email"
              type="password"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box marginBottom={3} borderRadius="20px">
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              size="small"
              sx= {{ borderRadius: "15px", border: "1px solid red", }}
            />
          </Box>
        </form>
        <Box margin={3}>
          <Button variant="contained" color="primary">
            Se connecter
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
