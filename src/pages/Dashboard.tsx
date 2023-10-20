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
import Tasks from '../components/Tasks';
import Stats from '../components/Stats';

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

type Weather = {
  city: string;
  temp: number;
  icon: string;
}

const Dashboard: React.FC = () => {

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [data, setData] = useState<Date>(new Date());
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<Weather>({
    city: '',
    temp: 0,
    icon: ''
  });

  const showDetailsHandle = (day: Date) => {
    setData(day);
    setShowDetails(true);
  };


  const userContext = useContext(UserContext)
  console.log(userContext,"userContext")

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
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

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
      console.error('Error: quote impossible to fetch');
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)

      setWeather({
        city: response.data.name,
        temp: response.data.main.temp,
        icon: response.data.weather[0].icon
      });
    } catch (error: any) {
      console.error('Error: Weather impossible to fetch');
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }, []);

  useEffect(() => {
    if (latitude !== null) {
      fetchWeather()
    }
  }, [latitude]);


  return (
    <ThemeProvider theme={theme}>
      <Layout>
          <div className='quoteContainer'>
            {weather.city ? (
              <div className='weather'>
                <p>
                  {weather.city},
                </p>
                <p>
                  {Math.floor(weather.temp)}°
                </p>
                <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="Weather Icon" />
              </div>
            ) : (
              <p>
                Weather data not available
              </p>
            )}
            <Tooltip title="Get a quote">
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
            </Box>
          </Modal>
          <Stats></Stats>
          <Tasks ></Tasks>
      </Layout>
    </ThemeProvider >
  );
}

export default Dashboard;