import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import TextField from '@mui/material/TextField'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Cloud from '@mui/icons-material/Cloud'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import CloseIcon from '@mui/icons-material/Close'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  setCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { cloneDeep } from 'lodash'

import { createNewCardAPI, deleteColumnAPI, updateColumnAPI } from '~/apis'
import Cards from './Cards/Cards'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import { Typography } from '@mui/material'

function Column({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column?._id, data: { ...column } })
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const [openInput, setOpenInput] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [opened, setOpened] = useState(false)
  const [title, setTitle] = useState('')

  const confirmDeleteColumn = useConfirm()

  const handleClick = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleOpened = () => {
    setOpened(!opened)
  }

  const addNewCard = async () => {
    if (!title) {
      toast.error('Please enter a title!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored'
      })
      return
    }

    const createdCard = await createNewCardAPI({
      ...{ title, columnId: column._id },
      boardId: board._id
    })

    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    )

    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }

    dispatch(setCurrentActiveBoard(newBoard))

    toggleOpened()
    setTitle('')
  }

  const handleDeleteColumn = (columnId) => {
    confirmDeleteColumn({
      description:
        'This action will permanently delete your column and its cards!',
      title: 'Delete column',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      const newBoard = cloneDeep(board)

      newBoard.columns = newBoard.columns.filter(
        (column) => column._id !== columnId
      )
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
        (_id) => _id !== columnId
      )

      dispatch(setCurrentActiveBoard(newBoard))

      deleteColumnAPI(column._id).then((res) => {
        toast.success(res?.result, {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored'
        })
      })
    })
  }

  const handleUpdateColumnTitle = (newTitle) => {
    updateColumnAPI(column._id, { title: newTitle }).then((res) => {
      const newBoard = cloneDeep(board)
      const columnToUpdate = newBoard.columns.find(
        (column) => column._id === res._id
      )
      if (columnToUpdate) columnToUpdate.title = res.title

      dispatch(setCurrentActiveBoard(newBoard))
    })
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        sx={{
          width: '270px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101204' : '#f1f2f5',
          ml: 2,
          borderRadius: 2,
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight - theme.spacing(5)})`,
          '&:last-child': { mr: 2 }
        }}
        {...listeners}
      >
        {/* // Box for column header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 1.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={() => setOpenInput(true)}
        >
          {openInput ? (
            <ToggleFocusInput
              value={column?.title}
              onChangedValue={handleUpdateColumnTitle}
              setOpenInput={setOpenInput}
              autoFocus={true}
            />
          ) : (
            <Typography
              sx={{
                height: '40px',
                lineHeight: '40px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                px: 1,
                flexGrow: 1,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
              }}
              variant='h6'
            >
              {column?.title}
            </Typography>
          )}

          {/* // Box for column dropdown */}
          <Box>
            <Tooltip title='More option'>
              <ExpandMoreIcon
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d',
                  cursor: 'pointer'
                }}
              />
            </Tooltip>

            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                    '& .add-card-icon': {
                      color: (theme) => theme.palette.primary.main
                    }
                  }
                }}
                onClick={toggleOpened}
              >
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => handleDeleteColumn(column._id)}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon
                    className='delete-forever-icon'
                    fontSize='small'
                  />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* // List Cards */}
        <Cards cards={column.cards} />

        {/* // Box for column footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!opened ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon />} onClick={toggleOpened}>
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon
                  sx={{
                    cursor: 'pointer',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
                  }}
                />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                label='Enter card title...'
                type='text'
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd='true'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  '& label': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#22272c' : '#f1f2f5'
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
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
                  onClick={addNewCard}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer'
                  }}
                  onClick={toggleOpened}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
