import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'

// Khởi tạo đối tượng axiox (authorizeAxiosInstance) mục địch để custom và cấu hình chung cho dự án.
let authorizeAxiosInstance = axios.create()

// Thời gian chờ tói đa của 1 request là 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ cho việc chúng ra sẽ lưu JWT token (refresh & access) vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

export default authorizeAxiosInstance

// Cấu hinh interceptors
// Interceptor Request: Can thiệp vào giữa những cái response nhận về
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)
    let errorMessage = error?.message
    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message
    }

    // Dùng toastify để hiển thị mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ cho việc tự động refresh token
    if (error?.response?.status !== 410) {
      errorMessage = error.response.data.message.replace(
        'ValidationError: ',
        ''
      )
    }

    toast.error(errorMessage, { theme: 'colored' })
    return Promise.reject(error)
  }
)
