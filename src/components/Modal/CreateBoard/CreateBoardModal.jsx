import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CancelIcon from '@mui/icons-material/Cancel'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { createNewBoardAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

function CreateBoardModal({ open = false, setOpen }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const handleCloseModal = () => {
    setOpen(false)
    reset()
  }

  const submitCreateNewBoard = (data) => {
    const { title, description, type } = data

    toast
      .promise(createNewBoardAPI({ title, description, type }), {
        pending: 'Creating...',
        success: 'Create board successfully'
      })
      .then((res) => {
        handleCloseModal()
        navigate(`/boards/${res._id}`)
      })
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#1e2125' : '#fff',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '20px 30px'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer'
          }}
        >
          <CancelIcon
            color='error'
            sx={{ '&:hover': { color: 'error.light' } }}
            onClick={handleCloseModal}
          />
        </Box>
        <Box
          id='modal-modal-title'
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9fadbc' : '#172B4D'
          }}
        >
          <LibraryAddIcon />
          <Typography variant='h6' component='h2'>
            Create a new board
          </Typography>
        </Box>
        <Box id='modal-modal-description' sx={{ my: 2 }}>
          <form onSubmit={handleSubmit(submitCreateNewBoard)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <TextField
                  sx={{
                    '& label': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                    },
                    '& input': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                    },
                    '& label.Mui-focused': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      },
                      '&:hover fieldset': {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      }
                    },
                    '.MuiSvgIcon-root': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
                    }
                  }}
                  fullWidth
                  label='Title'
                  type='text'
                  variant='outlined'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AbcIcon fontSize='small' />
                        </InputAdornment>
                      )
                    }
                  }}
                  {...register('title', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 1,
                      message: 'Min Length is 1 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Max Length is 50 characters'
                    }
                  })}
                  error={!!errors['title']}
                />
                <FieldErrorAlert errors={errors} fieldName={'title'} />
              </Box>

              <Box>
                <TextField
                  sx={{
                    '& label': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                    },
                    '& input': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                    },
                    '& label.Mui-focused': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      },
                      '&:hover fieldset': {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      }
                    },
                    '.MuiSvgIcon-root': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
                    }
                  }}
                  fullWidth
                  label='Description'
                  type='text'
                  variant='outlined'
                  multiline
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <DescriptionOutlinedIcon fontSize='small' />
                        </InputAdornment>
                      )
                    }
                  }}
                  {...register('description', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 1,
                      message: 'Min Length is 1 characters'
                    },
                    maxLength: {
                      value: 255,
                      message: 'Max Length is 255 characters'
                    }
                  })}
                  error={!!errors['description']}
                />
                <FieldErrorAlert errors={errors} fieldName={'description'} />
              </Box>

              <Controller
                name='type'
                defaultValue={BOARD_TYPES.PUBLIC}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d',
                      '& .MuiButtonBase-root': {
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                      },
                      '& .Mui-checked': {
                        color: (theme) => theme.palette.primary.main
                      }
                    }}
                    {...field}
                    row
                    onChange={(event, value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControlLabel
                      value={BOARD_TYPES.PUBLIC}
                      control={<Radio size='small' />}
                      label='Public'
                      labelPlacement='start'
                    />
                    <FormControlLabel
                      value={BOARD_TYPES.PRIVATE}
                      control={<Radio size='small' />}
                      label='Private'
                      labelPlacement='start'
                    />
                  </RadioGroup>
                )}
              />

              <Box sx={{ alignSelf: 'flex-end' }}>
                <Button
                  className='interceptor-loading'
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateBoardModal
