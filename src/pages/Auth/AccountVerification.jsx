import Zoom from '@mui/material/Zoom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { OTP } from '~/components/Form/OtpInput'
import { OTP_LENGTH } from '~/utils/constants'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  logoutAPI,
  selectCurrentUser,
  updateUserAPI
} from '~/redux/user/userSlice'
import { sendOtpAPI, verifyUserAPI } from '~/apis'
import { useRunOnce } from '~/customHooks/useRunOnce'
import { useCountdown } from '~/customHooks/useCountdown'

let COUNTDOWN_TIME = 30

function AccountVerification() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const [seconds, setSeconds] = useState(COUNTDOWN_TIME)
  const timer = useCountdown(seconds, setSeconds)

  useRunOnce({
    fn: () => {
      return sendOtpAPI(email)
    },
    sessionKey: 'sendOtp'
  })
  useEffect(() => {
    return () => {
      if (currentUser) {
        dispatch(logoutAPI())
      }
    }
  }, [dispatch, navigate, email, currentUser])

  const handleSubmit = () => {
    if (!otp) {
      toast.error('Please enter OTP', { theme: 'colored' })
      return
    }
    if (otp.length < OTP_LENGTH) {
      toast.error('Please enter valid OTP', { theme: 'colored' })
      return
    }

    verifyUserAPI(email, otp).then(() => {
      if (currentUser) {
        dispatch(updateUserAPI({ isActive: true }))
        navigate('/boards', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    })
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            borderRadius: 3.75,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
            position: 'relative',
            maxWidth: '100%',
            overflow: 'hidden',
            padding: 5
          }}
        >
          <Typography variant='h5' fontWeight={700}>
            Enter OTP
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(0,0,0,0.7)',
                fontSize: '16px',
                textDecoration: 'none',
                textAlign: 'center'
              }}
              variant='body1'
            >
              Enter the OTP you received at <br />
              <strong>{email}</strong>
            </Typography>
            <Tooltip
              title={timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            >
              <Button
                sx={{
                  display: 'inline',
                  padding: 0,
                  maxWidth: 'fit-content',
                  color:
                    timer > 0
                      ? (theme) => theme.palette.text.disabled
                      : '#b99cff',
                  '&:hover': {
                    textDecoration: timer === 0 && 'underline',
                    bgcolor: 'transparent !important'
                  },
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (timer > 0) return
                  sendOtpAPI(email).then((res) => {
                    if (res) {
                      toast.success('OTP sent successfully')
                      setSeconds(COUNTDOWN_TIME)
                    }
                  })
                }}
                className='interceptor-loading'
              >
                Resend
              </Button>
            </Tooltip>
          </Box>
          <OTP
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={OTP_LENGTH}
          />

          <Button
            className='interceptor-loading'
            onClick={handleSubmit}
            variant='contained'
            color='primary'
            size='large'
            sx={{
              backgroundColor: '#512da8',
              color: '#fff',
              fontSize: '12px',
              padding: '10px 45px',
              border: '1px solid transparent',
              borderRadius: 1,
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              mt: 1.25,
              cursor: 'pointer'
            }}
          >
            Verify
          </Button>
        </Box>
      </Zoom>
    </Box>
  )
}

export default AccountVerification
