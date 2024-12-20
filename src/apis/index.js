import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const updateBoardAPI = async (boardId, board) => {
  return (await axios.put(`${API_ROOT}/v1/boards/${boardId}`, board)).data
}

export const createNewColumnAPI = async (column) => {
  return (await axios.post(`${API_ROOT}/v1/columns`, column)).data
}

export const updateColumnAPI = async (columnId, data) => {
  return (await axios.put(`${API_ROOT}/v1/columns/${columnId}`, data)).data
}

export const deleteColumnAPI = async (columnId) => {
  return (await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)).data
}

export const createNewCardAPI = async (card) => {
  return (await axios.post(`${API_ROOT}/v1/cards`, card)).data
}
