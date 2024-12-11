import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const getBoardAPI = async (boardId) => {
  return (await axios.get(`${API_ROOT}/v1/boards/${boardId}`)).data
}
