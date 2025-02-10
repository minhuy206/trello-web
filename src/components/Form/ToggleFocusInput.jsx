import { useState } from 'react'
import TextField from '@mui/material/TextField'

function ToggleFocusInput({
  value,
  setColumnTitle = null,
  onChangedValue,
  inputFontSize = '16px',
  setOpenInput,
  autoFocus = false
}) {
  const [inputValue, setInputValue] = useState(value)

  const triggerBlur = () => {
    setInputValue(inputValue.trim())
    autoFocus && setOpenInput(false)

    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }
    onChangedValue(inputValue)
    setColumnTitle && setColumnTitle(inputValue)
  }

  return (
    <TextField
      data-no-dnd='true'
      autoFocus={autoFocus}
      autoComplete='off'
      id='toggle-focus-input-controlled'
      fullWidth
      variant='outlined'
      size='small'
      value={inputValue ?? value}
      onChange={(event) => {
        setInputValue(event.target.value)
      }}
      onBlur={triggerBlur}
      sx={{
        borderRadius: 2,
        '& input': {
          fontSize: inputFontSize,
          fontWeight: 'bold',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
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
              theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
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
