import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import {
  fetchCardAPI,
  showActiveCardModal
} from '~/redux/activeCard/activeCardSlice'

function Card({ card }) {
  const dispatch = useDispatch()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card?._id, data: { ...card } })

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const setActiveCard = () => {
    dispatch(fetchCardAPI(card?._id))
    dispatch(showActiveCardModal())
  }

  return (
    <MuiCard
      onClick={setActiveCard}
      style={dndKitCardStyles}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard && 'none',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#22272c' : '#fff')
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140, borderRadius: '4px 4px 0 0' }}
          image={card?.cover}
        />
      )}

      <CardContent
        sx={{
          p: 1.5,
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d',
          '&:last-child': { p: 1.5 }
        }}
      >
        <Typography fontWeight={500}>{card?.title}</Typography>
      </CardContent>
      {(!!card?.memberIds?.length ||
        !!card?.commentOrderIds?.length ||
        !!card?.attachments?.length) && (
        <CardActions sx={{ px: 0.5, pb: 1, pt: 0 }}>
          {!!card?.memberIds?.length && (
            <Button size='small' startIcon={<GroupIcon />}>
              {card?.memberIds.length}
            </Button>
          )}
          {!!card?.commentOrderIds?.length && (
            <Button size='small' startIcon={<CommentIcon />}>
              {card?.commentOrderIds?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size='small' startIcon={<AttachmentIcon />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
