import { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  let [searchParams] = useSearchParams()

  const { email, token } = Object.fromEntries([...searchParams])

  const [verified, setVerified] = useState('pending')

  useEffect(() => {
    if (email && token) {
      verifyUserAPI(email, token)
        .then(() => setVerified('resolved'))
        .catch(() => setVerified('rejected'))
    }
  }, [email, token])

  if (!email && !token) {
    return <Navigate to='/404' />
  }

  if (verified === 'pending') {
    return <PageLoadingSpinner caption='Verifying account...' />
  } else if (verified === 'resolved') {
    return <Navigate to={`/login?verifiedEmail=${email}`} />
  } else {
    return <Navigate to='/login' />
  }
}

export default AccountVerification
