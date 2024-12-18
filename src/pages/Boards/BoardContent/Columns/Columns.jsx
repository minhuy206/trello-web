import { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import Add from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { toast } from 'react-toastify'

function Columns({ columns, createNewColumn, createNewCard, deleteColumn }) {
  const [opened, setOpened] = useState(false)

  const [title, setTitle] = useState('')

  const toggleOpened = () => {
    setOpened(!opened)
  }

  const addNewColumn = async () => {
    if (!title) {
      toast.error('Please enter a title!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored'
      })
      return
    }

    await createNewColumn({ title })

    toggleOpened()
    setTitle('')
  }

  return (
    <SortableContext
      items={columns?.map((column) => column?._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {columns?.map((column) => (
          <Column
            key={column?._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumn={deleteColumn}
          />
        ))}

        {/* Add new column button */}
        {!opened ? (
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              // minWidth: 'fit-content',
              mx: 2,
              borderRadius: 0.75,
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
            onClick={toggleOpened}
          >
            <Button
              startIcon={<Add />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                px: 2.5,
                py: 1
              }}
            >
              Add a new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              mx: 2,
              p: 1,
              borderRadius: 0.75,
              height: 'fit-content',
              // bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label='Enter column title...'
              type='text'
              size='small'
              variant='outlined'
              autoFocus
              data-no-dnd='true'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                minWidth: '300px',
                maxWidth: '300px',
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant='outlined'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.primary.main
                }}
                onClick={addNewColumn}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpened}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default Columns
