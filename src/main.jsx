import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
            <main>
              <App /> 
            </main>
        </ChakraProvider>  
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
)
