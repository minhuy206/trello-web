import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import { INVITATION_STATUS } from '~/utils/constants'

function CustomToastNotification({
  data: { invitation, updateBoardInvitation }
}) {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        // pl: 4.5,
        justifyContent: 'flex-end',
        gap: 2,
        alignItems: 'center',
        width: '100%',
        mb: 0.675
      }}
    >
      <Avatar
        sx={{
          position: 'absolute !important',
          left: -48,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 88,
          height: 88,
          zIndex: 10,
          backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
        }}
        alt={invitation?.inviter?.username}
        src={invitation?.inviter?.avatar}
      />
      <Grid size={{ sx: 10 }}>
        <Typography
          sx={{
            fontSize: '1rem',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
          }}
        >
          You have a new invitation from
          <br />
          {invitation?.inviter?.username}
        </Typography>
      </Grid>
      <Grid size={{ sx: 2 }} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          sx={{
            color: 'green',
            borderLeft: '1px solid rgba(0, 0, 0, 0.2) !important',
            borderRadius: 0
          }}
          onClick={() => {
            updateBoardInvitation(invitation?._id, INVITATION_STATUS.ACCEPTED)
          }}
        >
          Accept
        </Button>
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: '100%',
            height: '1px'
          }}
        />
        <Button
          sx={{
            borderLeft: '1px solid rgba(0, 0, 0, 0.2) !important',
            borderRadius: 0,
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.7)'
          }}
          onClick={() => {
            updateBoardInvitation(invitation?._id, INVITATION_STATUS.REJECTED)
          }}
        >
          Reject
        </Button>
      </Grid>
    </Grid>
  )
}

export default CustomToastNotification
