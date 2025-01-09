import Box from '@mui/material/Box'

import { Navigate, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

import LoginnRegister from './LoginnRegister'

function Auth() {
  const location = useLocation()
  const currentUser = useSelector(selectCurrentUser)

  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }
  const isLogin = location.pathname === '/login'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2125' : '#fff')
      }}
    >
      {isLogin && <LoginnRegister />}
    </Box>
  )
}

export default Auth
