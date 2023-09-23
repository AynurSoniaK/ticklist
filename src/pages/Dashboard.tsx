import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import theme from '../theme';
import Layout from '../components/Layout'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import WeekCalendar from '../components/WeekCalendar';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Tasks } from '../components/Tasks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: 300,
  boxShadow: 24,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  border: '2px solid #000',
  p: 4,
};

type Quote = {
  quote: string;
  author: string;
  category: string;
}

const Dashboard: React.FC = () => {

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

  const navigate = useNavigate();

  const category = 'success'
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`
  const QUOTE_API_KEY = process.env.REACT_APP_QUOTE_API_KEY;

  const [quote, setQuote] = useState<Quote>({
    quote: '',
    author: '',
    category: ''
  });
  
  const [quoteFetched, setQuoteFetched] = useState(false);

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
            <Tooltip title="Get inspired">
              <IconButton onClick={handleOpen}>
                <LightbulbCircleIcon fontSize="large"></LightbulbCircleIcon>
              </IconButton>
            </Tooltip>
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
                  <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
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
          <Tasks></Tasks>
        </div>
      </Layout>
    </ThemeProvider >
  );
}

export default Dashboard;