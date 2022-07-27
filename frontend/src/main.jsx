import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ChakraProvider,extendTheme} from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom';

const theme = extendTheme({
  colors:{
    customBlue:{
      100:"#659999",
      500:"#659999"
    },
    customOrange:{
      100:"#f4791f",
      500:"#f4791f"
    }
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
