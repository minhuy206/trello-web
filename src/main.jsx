import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import theme from '~/theme'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
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
  </StrictMode>
)
