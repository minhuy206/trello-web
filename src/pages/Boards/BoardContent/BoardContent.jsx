import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './Columns/Columns'
import { mapOrder } from '~/utils/sort'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './Columns/Column/Column'
import Card from './Columns/Column/Cards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const findColumn = (cardId) => {
    return orderedColumns?.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  return (
    <DndContext
      onDragStart={({ active }) => {
        setActiveDragItemId(active?.id)

        setActiveDragItemType(
          active?.data?.current?.columnId
            ? ACTIVE_DRAG_ITEM_TYPE.CARD
            : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        )

        setActiveDragItemData(active?.data?.current)
      }}
      onDragOver={({ active, over }) => {
        if (
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ||
          !over?.id ||
          !active?.id
        )
          return

        const { id: overCardId, data: overCardData } = over
        const { id: activeCardId, data: activeCardData } = active

        const activeColumn = findColumn(activeCardId)

        const overColumn = findColumn(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn._id) {
          setOrderedColumns((prevColumn) => {
            const overCardIndex = overColumn?.cards?.findIndex(
              (card) => card._id === overCardId
            )

            let newCardIndex

            const isBelowOverItem =
              active.rect.current.translated &&
              active.rect.current.translated.top >
                over.rect.top + over.rect.height

            const modifier = isBelowOverItem ? 1 : 0

            newCardIndex =
              overCardIndex >= 0
                ? overCardIndex + modifier
                : overColumn?.cards?.length + 1

            const newColumns = cloneDeep(prevColumn)
            const newActiveColumn = newColumns.find(
              (column) => column._id === activeColumn._id
            )
            const newOverColumn = newColumns.find(
              (column) => column._id === overColumn._id
            )

            if (newActiveColumn) {
              newActiveColumn.cards = newActiveColumn.cards.filter(
                (card) => card._id !== activeCardId
              )

              newActiveColumn.cardOrderIds = newActiveColumn.cards.map(
                (card) => card._id
              )
            }

            if (newOverColumn) {
              newOverColumn.cards = newOverColumn.cards.filter(
                (card) => card._id !== activeCardId
              )

              newOverColumn.cards = newOverColumn.cards.toSpliced(
                newCardIndex,
                0,
                activeCardData.current
              )

              newOverColumn.cardOrderIds = newOverColumn.cards.map(
                (card) => card._id
              )
            }
            return newColumns
          })
        }
      }}
      onDragEnd={({ active, over }) => {
        if (
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD ||
          !over?.id ||
          !active?.id
        )
          return

        if (active.id !== over.id) {
          const oldIndex = orderedColumns.findIndex(
            (column) => column._id === active.id
          )
          const newIndex = orderedColumns.findIndex(
            (column) => column._id === over.id
          )

          const dndOrderedColumns = arrayMove(
            orderedColumns,
            oldIndex,
            newIndex
          )
          // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

          setOrderedColumns(dndOrderedColumns)
          setActiveDragItemId(null)
          setActiveDragItemType(null)
          setActiveDragItemData(null)
        }
      }}
      sensors={sensors}
    >
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          py: 1.25,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          height: (theme) => theme.trello.boardContentHeight
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId &&
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
            <Column column={activeDragItemData} />
          ) : (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
