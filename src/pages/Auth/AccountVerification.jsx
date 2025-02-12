import Zoom from '@mui/material/Zoom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { OTP } from '~/components/Form/OtpInput'
import { OTP_LENGTH } from '~/utils/constants'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { verifyUserAPI } from '~/redux/user/userSlice'
import { sendOtpAPI } from '~/apis'
import { useCountdown } from '~/customHooks/useCountdown'
import { useRunOnce } from '~/customHooks/useRunOnce'

let COUNTDOWN_TIME = 30

function AccountVerification() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const dispatch = useDispatch()
  const [seconds, setSeconds] = useState(COUNTDOWN_TIME)
  const timer = useCountdown(seconds, setSeconds)

  useRunOnce({
    fn: () => {
      toast
        .promise(sendOtpAPI(email), {
          pending: 'Sending OTP...',
          success: 'OTP sent successfully'
        })
        .catch(() => {
          navigate('/', { replace: true })
        })
    }
  })

  const handleSubmit = () => {
    if (!otp) {
      toast.error('Please enter OTP')
      return
    }
    if (otp.length < OTP_LENGTH) {
      toast.error('Please enter valid OTP')
      return
    }

    dispatch(verifyUserAPI({ email, otp })).then((res) => {
      if (res.type === 'user/verifyUserAPI/fulfilled') {
        res && navigate('/')
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
              <Typography
                sx={{
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
              </Typography>
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
