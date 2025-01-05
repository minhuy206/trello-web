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

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  setCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'

import { generatePlaceholderCard } from '~/utils/formatter'
import { createNewColumnAPI } from '~/apis'

function Columns({ columns }) {
  const [opened, setOpened] = useState(false)
  const [title, setTitle] = useState('')
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()

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

    const createdColumn = await createNewColumnAPI({
      ...{ title },
      boardId: board?._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(setCurrentActiveBoard(newBoard))

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
          <Column key={column?._id} column={column} />
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
                className='interceptor-loading'
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
