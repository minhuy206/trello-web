import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'

import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  FIELD_REQUIRED_MESSAGE,
  USERNAME_RULE
} from '~/utils/validators'
import { toast } from 'react-toastify'
import { forgotPasswordAPI } from '~/apis'

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = ({ forgotPasswordUsername: username }) => {
    toast.promise(
      forgotPasswordAPI({
        [USERNAME_RULE.test(username) ? 'username' : 'email']: username
      }),
      {
        pending: 'Sending reset password email...',
        success: 'Reset password email sent successfully!'
      }
    )
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
              Enter your username or email to reset your password
            </Typography>
            <Box>
              <TextField
                fullWidth
                label='Email or Username'
                type='text'
                variant='outlined'
                error={errors.forgotPasswordUsername}
                {...register('forgotPasswordUsername', {
                  required: FIELD_REQUIRED_MESSAGE,
                  validate: {
                    username: (value) => {
                      if (value.match(EMAIL_RULE) || value.match(USERNAME_RULE))
                        return true
                      return 'Invalid username or email!'
                    }
                  }
                })}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName='forgotPasswordUsername'
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

export default ForgotPassword
