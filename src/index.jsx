import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './App.css';

const theme = createTheme({
});

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>
);
