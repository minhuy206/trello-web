import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const createNewBoardAPI = async (board) => {
  return (await authorizeAxiosInstance.post(`${API_ROOT}/v1/boards`, board))
    .data
}

export const fetchBoardsAPI = async (searchPath) => {
  return (
    await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`)
  ).data
}

export const updateBoardAPI = async (boardId, board) => {
  return (
    await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, board)
  ).data
}

export const createNewColumnAPI = async (column) => {
  return (await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, column))
    .data
}

export const updateColumnAPI = async (columnId, column) => {
  return (
    await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/columns/${columnId}`,
      column
    )
  ).data
}

export const deleteColumnAPI = async (columnId) => {
  return (
    await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  ).data
}

export const createNewCardAPI = async (card) => {
  return (await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, card)).data
}

export const updateCardAPI = async (cardId, card) => {
  return (
    await authorizeAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, card)
  ).data
}

export const registerUserAPI = async (account) => {
  const res = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    account
  )

  toast.success(
    'Register successfully! Please verify your email to continue.',
    {
      theme: 'colored'
    }
  )
  return res.data
}

export const verifyUserAPI = async (email, token) => {
  const res = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/verify`, {
    email,
    token
  })
  toast.success('Account verified successfully!', {
    theme: 'colored'
  })
  return res.data
}

export const refreshTokenAPI = async () => {
  return (
    await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh-token`)
  ).data
}
