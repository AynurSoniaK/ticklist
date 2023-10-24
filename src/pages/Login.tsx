import { useContext, useEffect, useState } from 'react';
import LayoutNotLogged from '../components/LayoutNotLogged';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../context/UserContext';

const Login: React.FC = () => {

  const userContext = useContext(UserContext)

  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/register');
  };

  const auth = getAuth();

  const handleSignin = async () => {

    if (!formData.email || !formData.password) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, formData.email, formData.password
      );
      const user = auth.currentUser;

      if (user) {
          navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <LayoutNotLogged>
      <Box padding="20px 0 0 20px" sx={{ cursor: "pointer" }} onClick={handleButtonClick}>
        <ArrowCircleLeftOutlinedIcon></ArrowCircleLeftOutlinedIcon>
      </Box>
      <Box
        padding="20px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        minHeight="70vh">
        <Typography variant="h4" component="h1" gutterBottom marginBottom={5} sx={{ textTransform: 'uppercase' }}>
          Welcome Back
        </Typography>
        <form>
          <Box marginBottom={3}>
            <TextField
              placeholder="Email"
              type="email"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              autoComplete="off"
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              placeholder="Password"
              type="password"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 5 } }}
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              autoComplete="new-password"
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
          <Button variant="contained" color="primary" className='button-gradient' sx={{ p: "10px 20px", borderRadius: "20px" }} onClick={handleSignin}>
            Log in
          </Button>
        </Box>
        <Box>
          <Typography variant="caption">By continuing, you agree to our terms.</Typography>
        </Box>
      </Box>
    </LayoutNotLogged>
  );
}

export default Login;
