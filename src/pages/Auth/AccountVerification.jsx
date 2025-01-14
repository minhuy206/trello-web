import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { resendOtpAPI, verifyUserAPI } from '~/apis'
import Zoom from '@mui/material/Zoom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import { OTP } from '~/components/Form/OtpInput'
import { OTP_LENGTH } from '~/utils/constants'
import { toast } from 'react-toastify'

const COUNTDOWN_TIME = 30

function AccountVerification() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const [countDown, setCountDown] = useState(COUNTDOWN_TIME)
  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countDown])

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
      navigate('/login')
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
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -12]
                      }
                    }
                  ]
                }
              }}
              title={
                countDown > 0 ? `Resend OTP in ${countDown}s` : 'Resend OTP'
              }
            >
              <Button
                sx={{
                  display: 'inline',
                  padding: 0,
                  maxWidth: 'fit-content',
                  color:
                    countDown > 0
                      ? (theme) => theme.palette.text.disabled
                      : '#b99cff',
                  '&:hover': {
                    textDecoration: countDown === 0 && 'underline',
                    bgcolor: 'transparent !important'
                  },
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (countDown > 0) return
                  resendOtpAPI(email).then((res) => {
                    if (res) {
                      toast.success('OTP sent successfully')
                      setCountDown(COUNTDOWN_TIME)
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
