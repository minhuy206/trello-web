/* eslint-disable indent */
import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'
import Columns from './Columns/Columns'
import Column from './Columns/Column/Column'
import Card from './Columns/Column/Cards/Card/Card'
import { updateBoardAPI, updateColumnAPI } from '~/apis'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch } from 'react-redux'

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
  const lastOverId = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setOrderedColumns(board.columns)
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

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return

      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const overColumnId = orderedColumns.find(
          (column) => column._id === overId
        )

        if (overColumnId) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                overColumnId.cardOrderIds.includes(container.id)
            )
          })[0]?.id
        }
        lastOverId.current = overId

        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  const findColumn = (cardId) => {
    return cloneDeep(orderedColumns)?.find((column) =>
      column?.cards?.map((card) => card._id).includes(cardId)
    )
  }

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(newBoard))

    updateBoardAPI(board._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCard = (
    board,
    columnId,
    cardId,
    dndOrderedCards,
    dndOrderedCardIds
  ) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }

    dispatch(updateCurrentActiveBoard(newBoard))

    updateColumnAPI(columnId, {
      cardId,
      column: {
        cardOrderIds: dndOrderedCardIds.filter(
          (cardId) => cardId !== `${columnId}-placeholder-card`
        )
      }
    })

    return newBoard
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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

        const { id: overCardId } = over

        const {
          id: activeCardId,
          data: { current: activeCardData }
        } = active

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

            const nextColumns = cloneDeep(prevColumn)

            const nextActiveColumn = nextColumns.find(
              (column) => column._id === activeColumn._id
            )

            const nextOverColumn = nextColumns.find(
              (column) => column._id === overColumn._id
            )

            if (nextActiveColumn) {
              nextActiveColumn.cards = nextActiveColumn.cards.filter(
                (card) => card._id !== activeCardId
              )

              if (nextActiveColumn.cards.length === 0) {
                nextActiveColumn.cards = [
                  generatePlaceholderCard(nextActiveColumn)
                ]
              }
              nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                (card) => card._id
              )
            }

            if (nextOverColumn) {
              nextOverColumn.cards = nextOverColumn.cards.filter(
                (card) => card._id !== activeCardId
              )
              nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                newCardIndex,
                0,
                activeCardData
              )
              nextOverColumn.cards = nextOverColumn.cards.filter(
                (card) => !card.FE_PlaceholderCard
              )
              nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                (card) => card._id
              )
            }

            return nextColumns
          })
        }
      }}
      onDragEnd={async ({ active, over }) => {
        if (!active || !over) return

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
          const { id: overCardId } = over

          const { id: activeCardId } = active

          const overColumn = findColumn(overCardId)

          const activeColumnId = active.data.current.columnId

          if (!overColumn) return

          const dndOrderedCards = arrayMove(
            overColumn.cards.map((card) => {
              if (card._id === activeCardId) {
                card.columnId = overColumn._id
              }
              return card
            }),
            overColumn.cardOrderIds.findIndex(
              (cardId) => cardId === activeCardId
            ), //  old card index
            overColumn.cardOrderIds.findIndex((cardId) => cardId === overCardId) // new card index
          )

          const dndOrderedCardOrderIds = dndOrderedCards.map((card) => card._id)

          setOrderedColumns((prevColumns) => {
            const nextColumns = cloneDeep(prevColumns).map((column) => {
              if (column._id === overColumn._id) {
                column.cards = dndOrderedCards
                column.cardOrderIds = dndOrderedCardOrderIds
              }

              return column
            })

            return nextColumns
          })

          if (activeColumnId !== overColumn._id) {
            const activeColumn = orderedColumns.find(
              (column) => column._id === activeColumnId
            )

            await moveCard(
              await moveCard(
                board,
                activeColumnId,
                activeCardId,
                activeColumn.cards,
                activeColumn.cardOrderIds
              ),
              overColumn._id,
              activeCardId,
              dndOrderedCards,
              dndOrderedCardOrderIds
            )
          } else {
            await moveCard(
              board,
              overColumn._id,
              activeCardId,
              dndOrderedCards,
              dndOrderedCardOrderIds
            )
          }
        } else if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
          const dndOrderedColumns = arrayMove(
            orderedColumns,
            orderedColumns.findIndex((column) => column._id === active.id), // old column index
            orderedColumns.findIndex((column) => column._id === over.id) // new column index
          )

          moveColumn(dndOrderedColumns)

          setOrderedColumns(dndOrderedColumns)
        }
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
      }}
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
        <Columns columns={orderedColumns} />
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
