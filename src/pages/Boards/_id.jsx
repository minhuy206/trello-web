import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  fetchBoardAPI,
  selectCurrentActiveBoard,
  setCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCardModal'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { _id } = useParams()

  useEffect(() => {
    dispatch(fetchBoardAPI(_id))

    return () => {
      dispatch(setCurrentActiveBoard(null))
    }
  }, [dispatch, _id])

  return (
    <>
      <ActiveCard />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </>
  )
}

export default Board
