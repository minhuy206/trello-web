import { Route, Routes, Navigate } from 'react-router-dom'

import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate to='/boards/675ab2cfefdc5b3edb4a19a4' replace={true} />
        }
      />
      <Route path='/boards/:_id' element={<Board />}></Route>

      <Route path='/login' element={<Auth />}></Route>

      <Route
        path='/account/verification'
        element={<AccountVerification />}
      ></Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
