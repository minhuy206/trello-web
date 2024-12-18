import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const getBoardAPI = async (boardId) => {
  return (await axios.get(`${API_ROOT}/v1/boards/${boardId}`)).data
}

export const createNewCardAPI = async (card) => {
  return (await axios.post(`${API_ROOT}/v1/cards`, card)).data
}

export const createNewColumnAPI = async (column) => {
  return (await axios.post(`${API_ROOT}/v1/columns`, column)).data
}

export const updateBoardAPI = async (boardId, board) => {
  return (await axios.put(`${API_ROOT}/v1/boards/${boardId}`, board)).data
}
