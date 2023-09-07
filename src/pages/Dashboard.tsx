import { useEffect, useState, useContext } from 'react'
import '../App.css'
import axios from 'axios'
import { app, db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import theme from '../theme';
import { Container, Box, Stack, Typography, ThemeProvider } from '@mui/material'
import { UserContext } from '../context/UserContext';

type Quote = {
  quote: string;
  author: string;
  category: string;
}

function Dashboard(): JSX.Element {

  const userContext = useContext(UserContext)
  console.log(userContext)
  const [quote, setQuote] = useState<Quote>({
    quote: '',
    author: '',
    category: ''
  });
  const [quoteFetched, setQuoteFetched] = useState(false);

  const QUOTE_API_KEY = process.env.REACT_APP_QUOTE_API_KEY

  async function addTasks(): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: "Ada",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const category = 'success'
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`
    const QUOTE_API_KEY = process.env.REACT_APP_QUOTE_API_KEY;

    // Create a recursive function to fetch quotes until the desired condition is met
    const fetchQuote = () => {
      axios.get(apiUrl, {
        headers: {
          'X-Api-Key': QUOTE_API_KEY
        }
      })
        .then(response => {
          const newQuote = response.data[0];
          console.log(newQuote)

          if (newQuote.quote.length <= 80) {
            // Condition met: Quote length is less than or equal to 80 characters
            setQuote(newQuote)
          } else {
            // Condition not met: Quote length is greater than 80 characters
            // Make another API call by calling the function recursively
            fetchQuote()
          }
        })
        .catch(error => {
          console.error('Error: ', error.response ? error.response.data : error.message);
        });
    };

    if (!quoteFetched) {
      fetchQuote() 
    }
  }, [quoteFetched]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm"></Container>
      <Box className='container'>
        <Box sx={{
          bgcolor: '#fff',
          padding: '25px',
          height: "80vh",
          borderRadius: '10px',
          backgroundSize: 'cover',
          minWidth:"850px"
        }}>
          <Stack direction="row" spacing={3} sx={{ color: '#fff', backgroundColor: '#2196F3',}}>
            <Typography variant='h4' component={'h1'}>Hello {userContext.user?.username}</Typography>
            {quote.quote &&
              <Box sx={{ width: '250px' }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>"{quote.quote}"</Typography>
                <Typography variant="body2">{quote.author !== "unknown" && quote.author}</Typography>
              </Box>
            }
          </Stack>
          {/* <Button variant="contained" onClick={() => addTasks()}>Ajouter une task</Button> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;