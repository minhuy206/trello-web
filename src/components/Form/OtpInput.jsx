import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  height: 60px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'};
  background: ${theme.palette.background.default};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    border-color: #512da8;
  }
  &:focus {
    border-color: #512da8;
    box-shadow: 0 0 10px 1px #512da8;
  }
  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`
)

export const OTP = ({ separator, length, value, onChange }) => {
  const inputRefs = React.useRef(new Array(length).fill(null))

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.focus()
  }

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.select()
  }

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault()
        break
      case 'ArrowLeft':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }
        break
      case 'ArrowRight':
        event.preventDefault()
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1)
          selectInput(currentIndex + 1)
        }
        break
      case 'Delete':
        event.preventDefault()
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })

        break
      case 'Backspace':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })
        break

      default:
        break
    }
  }

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value
    const regex = /^\d+$/
    if (!regex.test(currentValue)) {
      return
    }
    let indexToEnter = 0

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1
      } else {
        break
      }
    }
    onChange((prev) => {
      const otpArray = prev.split('')
      const lastValue = currentValue[currentValue.length - 1]
      otpArray[indexToEnter] = lastValue
      return otpArray.join('')
    })
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1)
      }
    }
  }

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex)
  }

  const handlePaste = (event, currentIndex) => {
    event.preventDefault()
    const clipboardData = event.clipboardData

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain')
      pastedText = pastedText.substring(0, length).trim()
      let indexToEnter = 0

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1
        } else {
          break
        }
      }

      const otpArray = value.split('')

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' '
        otpArray[i] = lastValue
      }

      onChange(otpArray.join(''))
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <TextField
            autoComplete='off'
            slots={{
              input: InputElement
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? ''
              }
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  )
}
