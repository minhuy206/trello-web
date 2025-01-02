import AppBar from '~/components/AppBar/AppBar'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import randomColor from 'randomcolor'
import SidebarCreateBoardModal from './create'
import { fetchBoardsAPI } from '~/apis'

import { styled } from '@mui/material/styles'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
// Styles của mấy cái Sidebar item menu, anh gom lại ra đây cho gọn.
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))

  // Xử lý phân trang từ url với MUI: https://mui.com/material-ui/react-pagination/#router-integration
  const location = useLocation()
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search)

  const page = parseInt(query.get('page') || '1', 10)

  const updateBoardsState = (newBoards) => {
    setBoards(newBoards.boards || [])
    setTotalBoards(newBoards.totalBoards || 0)
  }

  useEffect(() => {
    fetchBoardsAPI(location.search).then(updateBoardsState)
  }, [location.search])

  const afterCreateNewBoard = () => {
    fetchBoardsAPI(location.search).then(updateBoardsState)
  }

  if (!boards) {
    return <PageLoadingSpinner caption='Loading Boards...' />
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box
        sx={{
          paddingX: 2,
          my: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
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
              <SidebarCreateBoardModal
                afterCreateNewBoard={afterCreateNewBoard}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 9 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3 }}>
              Your boards:
            </Typography>

            {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
            {boards?.length === 0 && (
              <Typography variant='span' sx={{ fontWeight: 'bold', mb: 3 }}>
                No result found!
              </Typography>
            )}

            {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
            {boards?.length > 0 && (
              <Grid container spacing={2}>
                {boards.map((board) => (
                  <Grid size={{ xs: 12, sm: 4, lg: 3 }} key={board._id}>
                    <Card component={Link} to={`/boards/${board._id}`}>
                      {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <Box
                        sx={{
                          height: lgDown ? '6vh' : '8vh',
                          maxHeight: '120px',
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
                        <Typography variant='h6' component='div'>
                          {board?.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {board?.description}
                        </Typography>
                        {/* <Box
                          // component={Link}
                          // to={`/boards/${board._id}`}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            color: 'primary.main',
                            '&:hover': { color: 'primary.light' }
                          }}
                        >
                          Go to board <ArrowRightIcon fontSize='small' />
                        </Box> */}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
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
                  // Giá trị của page hiện tại đang đứng
                  page={page}
                  // Render các page item và đồng thời cũng là những cái link để chúng ta click chuyển trang
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
    </Container>
  )
}

export default Boards
