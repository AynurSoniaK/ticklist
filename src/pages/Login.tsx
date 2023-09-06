import { useState } from 'react';
import LayoutNotLogged from '../components/LayoutNotLogged';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const auth = getAuth();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };


  return (
    <LayoutNotLogged>
      <Box padding="20px 0 0 20px" sx={{ cursor: "pointer" }} onClick={handleButtonClick}>
        <ArrowCircleLeftOutlinedIcon></ArrowCircleLeftOutlinedIcon>
      </Box>
      <Box
        padding="40px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        minHeight="70vh">
        <Typography variant="h4" component="h1" gutterBottom margin={5} sx={{ textTransform: 'uppercase' }}>
          Create your profile
        </Typography>
        <form>
          <Box marginBottom={3}>
            <TextField
              placeholder="SoniaK"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              placeholder="soniak@gmail.com"
              type="email"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
              value={email}
              onChange={handleEmailChange}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              placeholder="************"
              type="password"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          <Divider sx={{ padding: "20px" }}>OR</Divider>
        </form>
        <Box>
          <img
            src="https://cdn-icons-png.flaticon.com/128/10091/10091758.png"
            alt="Log with Google"
            width={40}
            style={{ opacity: 0.8, margin: "20px 10px", cursor: "pointer" }}
          />
          <img alt="Log with Facebook"
            src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png"
            width={40}
            style={{ opacity: 0.2, margin: "20px 10px" }}
          />
          <img alt="Log with LinkedIn"
            src="https://cdn-icons-png.flaticon.com/128/1384/1384014.png"
            width={40}
            style={{ opacity: 0.2, margin: "20px 10px" }}
          />
        </Box>
        <Box margin={3}>
          <Button variant="contained" color="primary" className='button-gradient' sx={{ p: "10px 20px" }} onClick={handleSignup}>
            Start ticking
          </Button>
        </Box>
      </Box>
    </LayoutNotLogged>
  );
}

export default Login;
