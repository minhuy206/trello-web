import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { refreshTokenAPI } from '~/apis'
import { logoutAPI } from '~/redux/user/userSlice'

// Không thể import { store } theo cách thông thường ở đây
// Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizeAxios.js này
// Khi ứng dụng chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm injectStore(store) ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này

let axiosReduxStore = null
export const injectStore = (store) => {
  axiosReduxStore = store
}

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

// Khởi tạo một cái promise cho việc gọi api refresh token
// Mục đích tạo Promise này để khi nào gọi api refresh token xong thì mới retry lại nhiều api bị lỗi trước đó
let refreshTokenPromise = null

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

    //Trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api logout luôn
    if (error?.response?.status === 401) {
      axiosReduxStore.dispatch(logoutAPI())
    }

    //Trường hợp 2: nếu như nhận mã 410 từ BE, thì gọi api refresh token
    // Đầu tiên lấy được các request bị lỗi trước đó thông qua error.config
    const originalRequests = error.config
    if (error?.response?.status === 410 && !originalRequests._retry) {
      // Gán thêm một giá trị _retry vào trong originalRequests để biết rằng request này đã được retry rồi (chỉ gọi 1 lần tại 1 thời điểm)
      originalRequests._retry = true

      // Nếu chưa có refreshTokenPromise thì mới gọi api refresh token và lưu vào refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ BE)
            return data?.accessToken
          })
          .catch((_error) => {
            // Nếu nhận bất kỳ lỗi nào từ api refresh token thì gọi logout api luôn
            axiosReduxStore.dispatch(logoutAPI())
            return Promise.reject(_error)
          })
          .finally(() => {
            // Sau khi gọi xong api refresh token thì gán lại giá trị null cho refreshTokenPromise
            refreshTokenPromise = null
          })
      }

      // Cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        // Bước 1: Đối với trường hợp nếu dự án cần lưu accessToken vào trong localStorage hoặc đâu đó thì sẽ việt thêm code xử lý ở dây. Hiện tại ở đây không cân bước 1 này vì chúng ta đã đưa accessToken vào cookie sau khi gọi api refresh token thành công

        // Bước 2: return lại axios instance kết hợp với các originalRequests để gọi lại các api ban đầu  bị lỗi trước đó
        return authorizeAxiosInstance(originalRequests)
      })
    }

    let errorMessage = error?.response?.data?.message ?? error?.message
    // Dùng toastify để hiển thị mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ cho việc tự động refresh token
    if (error?.response?.status !== 410) {
      toast.error(errorMessage.replace('ValidationError: ', ''), {
        theme: 'colored'
      })
    }

    return Promise.reject(error)
  }
)
