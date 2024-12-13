import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <>
      <FormControl size='small' sx={{ minWidth: '120px' }}>
        <InputLabel
          sx={{
            color: (theme) => theme.palette['text-color'],
            '&.Mui-focused': { color: (theme) => theme.palette['text-color'] }
          }}
          id='label-select-dark-light-mode'
        >
          Mode
        </InputLabel>
        <Select
          labelId='label-select-dark-light-mode'
          id='select-dark-light-mode'
          value={mode}
          label='Mode'
          defaultValue={'light'}
          onChange={handleChange}
          sx={{
            color: (theme) => theme.palette['text-color'],
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette['text-color']
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette['text-color']
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette['text-color']
            },
            '.MuiSvgIcon-root': {
              color: (theme) => theme.palette['text-color']
            }
          }}
        >
          <MenuItem value='light'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightModeIcon fontSize='small' />
              Light
            </Box>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkModeOutlinedIcon fontSize='small' />
              Dark
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
export default ModeSelect
