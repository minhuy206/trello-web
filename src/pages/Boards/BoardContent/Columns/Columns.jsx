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
import { Skeleton } from '@mui/material'

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

  return columns ? (
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

        {!opened ? (
          <Box
            sx={{
              width: '270px',
              mx: 2,
              borderRadius: 1.5,
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
            onClick={toggleOpened}
          >
            <Button
              startIcon={<Add color='#fff' />}
              sx={{
                color: '#fff',
                bgcolor: '#ffffff3d',
                width: '100%',
                justifyContent: 'flex-start',
                px: 2.5,
                py: 1,
                '&:hover': { bgcolor: '#ffffff33' }
              }}
            >
              Add a new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              width: '270px',
              mx: 2,
              p: 1,
              borderRadius: 0.75,
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label='Enter column title...'
              type='text'
              variant='outlined'
              autoFocus
              data-no-dnd='true'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                width: '270px',
                '& label': {
                  color: '#fff'
                },
                '& input': {
                  color: '#fff'
                },
                '& label.Mui-focused': {
                  color: '#fff'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff'
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                className='interceptor-loading'
                variant='outlined'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: '#fff',
                  color: '#fff'
                }}
                onClick={addNewColumn}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  '&:hover': { color: '#ffffff33' }
                }}
                onClick={toggleOpened}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  ) : (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
    >
      {[...Array(3)].map((_, index) => (
        <Skeleton
          variant='rectangular'
          key={index}
          sx={{ ml: 2, width: '300px', height: `${600 / (index + 1)}px` }}
          animation='wave'
        />
      ))}
    </Box>
  )
}

export default Columns
