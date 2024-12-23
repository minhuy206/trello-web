import { createRoot } from 'react-dom/client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'

import { ConfirmProvider } from 'material-ui-confirm'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import theme from '~/theme'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { variant: 'outlined', color: 'error' },
            cancellationButtonProps: { color: 'inherit' },
            buttonOrder: ['confirm', 'cancel']
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
