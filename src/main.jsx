import { createRoot } from 'react-dom/client'

import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'

import { ConfirmProvider } from 'material-ui-confirm'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import theme from '~/theme'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Kỹ thuật Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
import { injectStore } from './utils/authorizeAxios'
injectStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <ThemeProvider defaultMode='light' theme={theme}>
          <ConfirmProvider
            defaultOptions={{
              dialogProps: { maxWidth: 'xs' },
              confirmationButtonProps: { variant: 'outlined', color: 'error' },
              cancellationButtonProps: { color: 'inherit' },
              buttonOrder: ['confirm', 'cancel']
            }}
          >
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
