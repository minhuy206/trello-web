import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { fetchBoardsAPI } from '~/apis'
import { useDebounceFn } from '~/customHooks/useDebounceFn'

function AutoCompleteSearchBoard() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [boards, setBoards] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setBoards(null)
    }
  }, [open])

  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value
    if (!searchValue) return

    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`

    setLoading(true)
    fetchBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || [])
      })
      .finally(() => setLoading(false))
  }
  const debounceFetchBoards = useDebounceFn(handleInputSearchChange, 1000)

  const handleSelectedBoard = (event, selectedBoard) => {
    if (!selectedBoard) return
    navigate(`/boards/${selectedBoard._id}`)
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id='asynchronous-search-board'
      noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={(board) => board.title}
      options={boards || []}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      onInputChange={debounceFetchBoards}
      onChange={handleSelectedBoard}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search'
          size='small'
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
                      }}
                      size={20}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }
          }}
          sx={{
            '& label': {
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            },
            '& input': {
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            },
            '& label.Mui-focused': {
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
              },
              '&:hover fieldset': {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
              },
              '&.Mui-focused fieldset': {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
              }
            },
            '.MuiSvgIcon-root': {
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteSearchBoard
