import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CancelIcon from '@mui/icons-material/Cancel'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'
import { styled } from '@mui/material/styles'

import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import {
  clearAndHideCurrentActiveCard,
  selectCurrentActiveCard,
  selectIsFetching,
  selectIsShowActiveCardModal,
  updateCard
} from '~/redux/activeCard/activeCardSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { updateBoard } from '~/redux/activeBoard/activeBoardSlice'

import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'

import { singleFileValidator } from '~/utils/validators'
import { commentOnCardAPI, updateCardAPI } from '~/apis'
import { CARD_MEMBER_ACTION } from '~/utils/constants'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))

function ActiveCard() {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const isShowActiveCardModal = useSelector(selectIsShowActiveCardModal)
  const isFetching = useSelector(selectIsFetching)
  const currentUser = useSelector(selectCurrentUser)

  const handleCloseModal = () => {
    dispatch(clearAndHideCurrentActiveCard())
  }

  const handleUpdateCard = async (card) => {
    const updatedCard = await updateCardAPI(activeCard._id, card)

    dispatch(updateCard(updatedCard))
    dispatch(updateBoard(updatedCard))

    return updatedCard
  }

  const handleUpdateCardTitle = (title) => {
    handleUpdateCard({ title: title.trim() })
  }

  const handleUpdateCardDescription = (description) => {
    handleUpdateCard({ description })
  }

  const handleUploadCardCover = (event) => {
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    toast.promise(
      handleUpdateCard(reqData).finally(() => (event.target.value = '')),
      { pending: 'Uploading card cover...', success: 'Uploaded card cover!' }
    )
  }

  const handleComment = async (content) => {
    if (!activeCard.memberIds.includes(currentUser._id)) {
      throw new Error('Please join the card to comment!')
    }
    const newComment = await commentOnCardAPI({
      content,
      boardId: activeCard.boardId,
      columnId: activeCard.columnId,
      cardId: activeCard._id,
      userId: currentUser._id
    })
    newComment.user = currentUser

    dispatch(
      updateCard({
        commentIds: [newComment._id, ...activeCard.commentIds],
        comments: [newComment, ...activeCard.comments]
      })
    )

    dispatch(
      updateBoard({
        ...activeCard,
        commentIds: [newComment._id, ...activeCard.commentIds]
      })
    )
  }

  const handleUpdateCardMember = (updateCardMemberIdData) => {
    handleUpdateCard({ updateCardMemberIdData })
  }

  return (
    <Modal
      disableScrollLock
      open={isShowActiveCardModal}
      onClose={handleCloseModal}
      sx={{ overflowY: 'auto' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 900,
          maxWidth: 900,
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '40px 20px 20px',
          margin: '50px auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#323940' : '#f1f2f5'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            right: '10px',
            cursor: 'pointer'
          }}
        >
          <CancelIcon
            color='error'
            sx={{ '&:hover': { color: 'error.light' } }}
            onClick={handleCloseModal}
          />
        </Box>

        {!isFetching ? (
          activeCard?.cover && (
            <Box sx={{ mb: 4 }}>
              <img
                style={{
                  width: '100%',
                  height: '320px',
                  borderRadius: '6px',
                  objectFit: 'cover'
                }}
                src={activeCard?.cover}
                alt='card-cover'
              />
            </Box>
          )
        ) : (
          <Skeleton
            variant='rectangular'
            width='100%'
            height='320px'
            sx={{ mb: 4 }}
          />
        )}

        <Box
          sx={{
            mb: 1,
            mt: -3,
            pr: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <CreditCardIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
            }}
          />

          {/* Feature 01: Xử lý tiêu đề của Card */}
          <ToggleFocusInput
            inputFontSize='22px'
            value={activeCard?.title}
            onChangedValue={handleUpdateCardTitle}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left side */}
          <Grid size={{ xs: 12, sm: 9 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
              >
                Members
              </Typography>

              {/* Feature 02: Xử lý các thành viên của Card */}
              <CardUserGroup
                currentUserId={currentUser._id}
                cardMemberIds={activeCard?.memberIds}
                isFetching={isFetching}
                handleUpdateCardMember={handleUpdateCardMember}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
                  }}
                />
                <Typography
                  variant='span'
                  sx={{
                    fontWeight: '600',
                    fontSize: '20px',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
                  }}
                >
                  Description
                </Typography>
              </Box>

              {/* Feature 03: Xử lý mô tả của Card */}
              <CardDescriptionMdEditor
                isFetching={isFetching}
                cardDescriptionProp={activeCard?.description}
                handleUpdateCardDescription={handleUpdateCardDescription}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
                  }}
                />
                <Typography
                  variant='span'
                  sx={{
                    fontWeight: '600',
                    fontSize: '20px',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
                  }}
                >
                  Activity
                </Typography>
              </Box>

              {/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
              <CardActivitySection
                isFetching={isFetching}
                comments={activeCard?.comments}
                handleComment={handleComment}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Add To Card
            </Typography>
            <Stack direction='column' spacing={1}>
              {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
              <SidebarItem
                className='active'
                onClick={() => {
                  handleUpdateCardMember({
                    action: activeCard.memberIds.includes(currentUser._id)
                      ? CARD_MEMBER_ACTION.REMOVE
                      : CARD_MEMBER_ACTION.ADD,
                    memberId: currentUser._id
                  })
                }}
              >
                <PersonOutlineOutlinedIcon fontSize='small' />
                {activeCard?.memberIds.includes(currentUser._id)
                  ? 'Disjoin'
                  : 'Join'}
              </SidebarItem>
              {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
              <SidebarItem className='active' component='label'>
                <ImageOutlinedIcon fontSize='small' />
                Cover
                <VisuallyHiddenInput
                  type='file'
                  onChange={handleUploadCardCover}
                />
              </SidebarItem>

              <SidebarItem>
                <AttachFileOutlinedIcon fontSize='small' />
                Attachment
              </SidebarItem>
              <SidebarItem>
                <LocalOfferOutlinedIcon fontSize='small' />
                Labels
              </SidebarItem>
              <SidebarItem>
                <TaskAltOutlinedIcon fontSize='small' />
                Checklist
              </SidebarItem>
              <SidebarItem>
                <WatchLaterOutlinedIcon fontSize='small' />
                Dates
              </SidebarItem>
              <SidebarItem>
                <AutoFixHighOutlinedIcon fontSize='small' />
                Custom Fields
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Power-Ups
            </Typography>
            <Stack direction='column' spacing={1}>
              <SidebarItem>
                <AspectRatioOutlinedIcon fontSize='small' />
                Card Size
              </SidebarItem>
              <SidebarItem>
                <AddToDriveOutlinedIcon fontSize='small' />
                Google Drive
              </SidebarItem>
              <SidebarItem>
                <AddOutlinedIcon fontSize='small' />
                Add Power-Ups
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Actions
            </Typography>
            <Stack direction='column' spacing={1}>
              <SidebarItem>
                <ArrowForwardOutlinedIcon fontSize='small' />
                Move
              </SidebarItem>
              <SidebarItem>
                <ContentCopyOutlinedIcon fontSize='small' />
                Copy
              </SidebarItem>
              <SidebarItem>
                <AutoAwesomeOutlinedIcon fontSize='small' />
                Make Template
              </SidebarItem>
              <SidebarItem>
                <ArchiveOutlinedIcon fontSize='small' />
                Archive
              </SidebarItem>
              <SidebarItem>
                <ShareOutlinedIcon fontSize='small' />
                Share
              </SidebarItem>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
