import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { toast } from 'react-toastify'
import { resetPasswordAPI } from '~/apis'
import { useNavigate, useSearchParams } from 'react-router-dom'

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { email, token } = Object.fromEntries([...searchParams])

  if (!email || !token) {
    navigate('/login', { replace: true })
  }

  const onSubmit = ({ password }) => {
    toast
      .promise(resetPasswordAPI({ email, password, token }), {
        pending: 'Resetting password...',
        success:
          'Password reset successfully!. You will be redirected to the login page in 3 seconds.'
      })
      .then((res) => {
        if (!res) {
          setTimeout(() => {
            navigate('/login', { replace: true })
          }, 3000)
        }
      })
  }

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
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 3.75,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              overflow: 'hidden',
              padding: 5
            }}
          >
            <Typography variant='h5' fontWeight={700}>
              Reset Password
            </Typography>
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
              Enter your new password and password confirmation to reset your
              password.
            </Typography>
            <Box sx={{ my: 1 }}>
              <TextField
                fullWidth
                label='Password'
                type='password'
                variant='outlined'
                error={errors.password}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='password' />
            </Box>
            <Box sx={{ my: 1 }}>
              <TextField
                fullWidth
                label='Password confirmation'
                type='password'
                variant='outlined'
                {...register('passwordConfirmation', {
                  validate: (value) => {
                    if (value === watch('password')) return true
                    return 'Password confirmation does not match!'
                  }
                })}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName='passwordConfirmation'
              />
            </Box>
            <Button
              className='interceptor-loading'
              type='submit'
              variant='contained'
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
              Reset your password
            </Button>
          </Box>
        </form>
      </Zoom>
    </Box>
  )
}

export default ResetPassword
