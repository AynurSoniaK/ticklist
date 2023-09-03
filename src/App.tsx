import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { app, db } from "./firebase"
import { collection, addDoc } from "firebase/firestore"
import theme from './theme';
import { Box, Grid, Stack, Typography, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material'

type Quote = {
  quote: string;
  author: string;
  category: string;
}

function App(): JSX.Element {

  // Define theme mui

  const [quote, setQuote] = useState<Quote>({
    quote: '',
    author: '',
    category: ''
  });
  const [quoteFetched, setQuoteFetched] = useState(false);


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
    const category = 'success';
    const apiKey = 'zQ6PyCP75/kAnHD7cTtiBw==WZTPLU2kcFYWRaCq';
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  
    // Create a recursive function to fetch quotes until the desired condition is met
    const fetchQuote = () => {
      axios.get(apiUrl, {
        headers: {
          'X-Api-Key': apiKey
        }
      })
        .then(response => {
          const newQuote = response.data[0];
          console.log(newQuote);
  
          if (newQuote.quote.length <= 80) {
            // Condition met: Quote length is less than or equal to 80 characters
            setQuote(newQuote);
          } else {
            // Condition not met: Quote length is greater than 80 characters
            // Make another API call by calling the function recursively
            fetchQuote();
          }
        })
        .catch(error => {
          console.error('Error: ', error.response ? error.response.data : error.message);
        });
    };
  
    if (!quoteFetched) {
      fetchQuote(); // Initial API call
    }
  }, [quoteFetched]);

  return (
    <ThemeProvider theme={theme}>
      <Box className='container'>
        <Box sx={{
          bgcolor: '#fff',
          padding: '25px',
          height: "80vh",
          borderRadius: '10px',
          backgroundImage: 'url(wave.png)',
          backgroundSize: 'cover',
          minWidth: "300px"
        }}>
          <Stack direction="row" spacing={3} sx={{ color: '#fff', }}>
            <Typography variant='h4' component={'h1'}>Hello Aynur</Typography>
            {quote.quote &&
              <Box>
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

export default App;
