// axios
import axios from 'axios'

export const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Access-Control-Allow-Methods': 'GET,HEAD,PATCH,POST,PUT',
  },
})



axiosIns.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  error => Promise.reject(error),
)



export default axiosIns
