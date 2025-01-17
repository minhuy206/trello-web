import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

import Login from './pages/Auth/Login'
import AccountVerification from './pages/Auth/AccountVerification'
import AccountSetting from './pages/AccountSetting/AccountSetting'
import Boards from './pages/Boards/Boards'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'

const ProtectedRoute = ({ user, isActive }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  } else if (user && !isActive) {
    return <Navigate to={`/account/verification?email=${user?.email}`} />
  }
  // Outlet của react-router-dom để điều hướng qua child route
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/boards' replace={true} />} />
      <Route
        element={
          <ProtectedRoute user={currentUser} isActive={currentUser?.isActive} />
        }
      >
        <Route path='/boards/:_id' element={<Board />} />
        <Route path='/settings/account' element={<AccountSetting />} />
        <Route path='/boards' element={<Boards />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
