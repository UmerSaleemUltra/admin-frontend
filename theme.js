import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', // Vibrant red
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#FF0000',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FF0000',
          },
        },
      },
    },
  },
});

export default theme;

