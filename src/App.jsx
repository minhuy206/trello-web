import { Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'

import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material'

import { routes } from './pages/routes'
import AppBar from './components/AppBar/AppBar'

const ProtectedRoute = ({ user, isVerified, navigate }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  return (
    <Container disableGutters maxWidth={false}>
      {!isVerified && (
        <Alert severity='error'>
          Your account is not verified. Please&nbsp;
          <Typography
            className='interceptor-loading'
            sx={{
              display: 'inline',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.7
              }
            }}
            onClick={() => {
              navigate(`/account/verification?email=${user.email}`)
            }}
          >
            verify
          </Typography>
          &nbsp;your email address.
        </Alert>
      )}
      <AppBar />
      <Outlet />
    </Container>
  )
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const { mode } = useColorScheme()

  return (
    <>
      <ToastContainer theme={mode} position='top-right' autoClose={3000} />
      <Routes>
        <Route path='/' element={<Navigate to='/boards' replace={true} />} />

        <Route
          element={
            <ProtectedRoute
              user={currentUser}
              isVerified={currentUser?.isVerified}
              navigate={navigate}
            />
          }
        >
          {routes.map((route) => {
            if (!route.public) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense>
                      <route.element />
                    </Suspense>
                  }
                />
              )
            }
          })}
        </Route>

        {routes.map((route) => {
          if (route.public) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense>
                    <route.element />
                  </Suspense>
                }
              />
            )
          }
        })}
      </Routes>
    </>
  )
}

export default App
