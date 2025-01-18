import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/material/styles'

import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import randomColor from 'randomcolor'
import { fetchBoardsAPI } from '~/apis'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import CreateBoardModal from '~/components/Modal/CreateBoard/CreateBoardModal'

const SidebarItem = styled(Box)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#9fadbc' : '#172B4D',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function Boards() {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  const updateBoardsState = (newBoards) => {
    setBoards(newBoards.boards || [])
    setTotalBoards(newBoards.totalBoards || 0)
  }

  useEffect(() => {
    fetchBoardsAPI(location.search).then(updateBoardsState)
  }, [location.search])

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        bgcolor: (theme) => theme.palette.background.default,
        height: '100%'
      }}
    >
      <Grid container spacing={2} sx={{ width: '100%', maxWidth: '1200px' }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Stack direction='column' spacing={1}>
            <SidebarItem className='active'>
              <SpaceDashboardIcon fontSize='small' />
              Boards
            </SidebarItem>
            <SidebarItem>
              <ListAltIcon fontSize='small' />
              Templates
            </SidebarItem>
            <SidebarItem>
              <HomeIcon fontSize='small' />
              Home
            </SidebarItem>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction='column' spacing={1}>
            <SidebarItem
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#172B4D'
              }}
              onClick={() => setOpen(true)}
            >
              <LibraryAddIcon fontSize='small' />
              Create a new board
            </SidebarItem>
            <CreateBoardModal open={open} setOpen={() => setOpen()} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 6, sm: 9 }}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#172B4D'
            }}
          >
            Your boards:
          </Typography>

          {boards ? (
            <>
              {boards?.length === 0 && (
                <Typography variant='span' sx={{ fontWeight: 'bold', mb: 3 }}>
                  No result found!
                </Typography>
              )}
              {boards?.length > 0 && (
                <Grid container spacing={2}>
                  {boards.map((board) => (
                    <Grid
                      size={{ xs: 12, sm: 4, lg: 3 }}
                      key={board._id}
                      sx={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        height: '10vh',
                        minHeight: '120px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? '#091e420f' : '#fff'
                      }}
                    >
                      <Card component={Link} to={`/boards/${board._id}`}>
                        {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                        {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                        <Box
                          sx={{
                            height: '50%',
                            backgroundColor: randomColor()
                          }}
                        ></Box>

                        <CardContent
                          sx={{
                            p: 1.5,
                            display: 'flex',
                            gap: 0.75,
                            flexDirection: 'column',
                            '&:last-child': { p: 1.5 }
                          }}
                        >
                          <Typography
                            variant='h6'
                            component='div'
                            sx={(theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#172B4D'
                            }
                          >
                            {board?.title}
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.7)'
                                  : 'rgba(0,0,0,0.7)'
                            }}
                          >
                            {board?.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            <Grid container spacing={2}>
              {[...Array(12)].map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 4, lg: 3 }}
                  key={index}
                  sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    height: '12vh'
                  }}
                >
                  <Skeleton
                    height={'50%'}
                    variant='rectangular'
                    animation='wave'
                  />
                  <Box
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      gap: 0.75,
                      flexDirection: 'column'
                    }}
                  >
                    <Skeleton animation='wave' />
                    <Skeleton animation='wave' width={'60%'} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {totalBoards > 0 && (
            <Box
              sx={{
                my: 3,
                pr: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Pagination
                size='large'
                color='secondary'
                showFirstButton
                showLastButton
                count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                page={page}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/boards${
                      item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`
                    }`}
                    {...item}
                  />
                )}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Boards
