import { useState } from 'react'
import TextField from '@mui/material/TextField'

function ToggleFocusInput({
  value,
  onChangedValue,
  inputFontSize = '16px',
  ...props
}) {
  const [inputValue, setInputValue] = useState(value)

  const triggerBlur = () => {
    setInputValue(inputValue.trim())

    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }

    onChangedValue(inputValue)
  }

  return (
    <TextField
      autoComplete='off'
      id='toggle-focus-input-controlled'
      fullWidth
      variant='outlined'
      size='small'
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value)
      }}
      onBlur={triggerBlur}
      {...props}
      sx={{
        borderRadius: 2,
        '& input': {
          fontSize: inputFontSize,
          fontWeight: 'bold',
          color: (theme) => (theme.palette.mode === 'dark' ? '#b6c3cf' : '#000')
        },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root:hover': {
          borderColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& fieldset': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? '#b6c3cf' : '#000'
          }
        },
        '& .MuiOutlinedInput-input': {
          px: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      }}
    />
  )
}

export default ToggleFocusInput
