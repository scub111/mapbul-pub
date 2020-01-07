import red from '@material-ui/core/colors/red';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Create a theme instance.
const innerTheme = createMuiTheme({
  // props: {
  // },
  typography: {
    // fontFamily: 'Raleway, Arial',
    // fontSize: 10, //14 - default
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export theme = responsiveFontSizes(innerTheme);
// theme.typography.subtitle1 = {
//   fontSize: 12,
//   // '@media (min-width:600px)': {
//   //   fontSize: 14,
//   // },
//   [theme.breakpoints.up('xs')]: {
//     fontSize: 12,
//   },
//   [theme.breakpoints.up('sm')]: {
//     fontSize: 14,
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: 16,
//   },
//   [theme.breakpoints.up('lg')]: {
//     fontSize: 18,
//   },
// } as any;

// theme.typography.h5 = {
//   fontSize: 14,
//   [theme.breakpoints.up('xs')]: {
//     fontSize: 14,
//   },
//   [theme.breakpoints.up('sm')]: {
//     fontSize: 16,
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: 18,
//   },
//   [theme.breakpoints.up('lg')]: {
//     fontSize: 20,
//   },
// } as any;