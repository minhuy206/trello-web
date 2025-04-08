/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import {
  fetchBoardAPI,
  selectCurrentActiveBoard,
  setCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCardModal'
const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { _id } = useParams()

  if (!OBJECT_ID_RULE.test(_id)) {
    return <Navigate to='/404' replace={true} />
  }

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
