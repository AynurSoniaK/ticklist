import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { app, db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import theme from '../theme';
import Layout from '../components/Layout'
import { UserContext } from '../context/UserContext';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import WeekCalendar from '../components/WeekCalendar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: 300,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  p: 4,
};

type Quote = {
  quote: string;
  author: string;
  category: string;
}

type UserType = {
  uid: string,
  username: string,
  photo: string,
  email: string
};

function Dashboard(): JSX.Element {

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [data, setData] = useState<string | null>(null);

  const showDetailsHandle = (dayStr: string) => {
    setData(dayStr);
    setShowDetails(true);
  };

  const userContext = useContext(UserContext)
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
    fetchQuote()
  };
  const handleClose = () => {
    setOpen(false);
    setQuoteFetched(false)
  }

  const category = 'success'
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`
  const QUOTE_API_KEY = process.env.REACT_APP_QUOTE_API_KEY;

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

  const fetchQuote = async () => {
    setQuote({
      quote: '',
      author: '',
      category: ''
    });
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': QUOTE_API_KEY
        }
      });

      const newQuote = response.data[0];
      if (newQuote.quote.length <= 80) {
        // Condition met: Quote length is less than or equal to 80 characters
        setQuote(newQuote);
        setQuoteFetched(true)
      } else {
        // Condition not met: Quote length is greater than 80 characters
        // Make another API call by calling the function recursively
        await fetchQuote(); // Use 'await' here to wait for the recursive call to complete
      }
    } catch (error: any) {
      console.error('Error: ', error.response ? error.response.data : error.message);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <div>
          <div className='quoteContainer'>
            <Button onClick={handleOpen} color="secondary">Get inspired</Button>
          </div>
          <WeekCalendar showDetailsHandle={showDetailsHandle} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <>
                {!quoteFetched ? (
                  <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                    <CircularProgress color="secondary" />
                  </Box>
                ) : (
                  <>
                    <Typography id="modal-modal-description" variant="body1" sx={{ fontStyle: 'italic' }}>
                      "{quote.quote}"
                    </Typography>
                    {quote.author && (
                      <Typography id="modal-modal-title" variant="body2" marginTop={2}>
                        {quote.author}
                      </Typography>
                    )}
                  </>
                )}

              </>
            </Box>
          </Modal>
        </div>
      </Layout>
    </ThemeProvider >
  );
}

export default Dashboard;