import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import AccountSetting from './pages/AccountSetting/AccountSetting'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  // Outlet của react-router-dom để điều hướng qua child route
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate to='/boards/675ab2cfefdc5b3edb4a19a4' replace={true} />
        }
      />

      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/boards/:_id' element={<Board />} />
        <Route path='/settings/account' element={<AccountSetting />} />
      </Route>

      <Route path='/login' element={<Auth />} />

      <Route path='/account/verification' element={<AccountVerification />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
