import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Tool from './component/Tool';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: red['A400']
    },
    mode: 'dark'
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

function App() {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const changeMode = () => {
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          height: 'calc(100% - 32px)'
        }}>
        <Tool changeMode={changeMode} theme={theme} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
