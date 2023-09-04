import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const customPalette = {
  primary: {
    main: '#BBF0BC', 
  },
  secondary: {
    main: '#FDCA8A',
  },
};

let theme = createTheme({
  palette: customPalette, 
});

theme = responsiveFontSizes(theme);

theme.typography.body1 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
};

theme.typography.body2 = {
  fontSize: '0.9rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
};

export default theme;
