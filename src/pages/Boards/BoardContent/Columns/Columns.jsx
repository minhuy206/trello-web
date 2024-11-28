import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import Add from '@mui/icons-material/Add'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

function Columns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
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
        <Box
          sx={{
            minWidth: 'fit-content',
            mx: 2,
            borderRadius: 0.75,
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
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
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default Columns
