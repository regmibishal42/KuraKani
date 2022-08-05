import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom';
import ChatProvider from './Context/chatProvider';

const theme = extendTheme({
    colors: {
        customBlue: {
            100: "#659999",
            500: "#659999"
        },
        customOrange: {
            100: "#f4791f",
            500: "#ff3c00"
        }
    }
})


ReactDOM.createRoot(document.getElementById('root')).render (<BrowserRouter>
    <ChatProvider>
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </ChatProvider>
</BrowserRouter>)
