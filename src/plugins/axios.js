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


const axiosWithCredentials = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Access-Control-Allow-Methods': 'GET,HEAD,PATCH,POST,PUT',
  },
  withCredentials: true,
})

axiosIns.interceptors.request.use(
  config => {
    // Do something before request is sent
    //
    // const cookie = localStorage.getItem('accessToken')
    //
    // if (cookie) config.headers.Cookie = cookie

    return config
  },
  error => Promise.reject(error),
)
axiosWithCredentials.interceptors.request.use(
  config => {
    // Do something before request is sent
    //
    // const cookie = localStorage.getItem('accessToken')
    //
    // if (cookie) config.headers.Cookie = cookie

    return config
  },
  error => Promise.reject(error),
)


export default axiosWithCredentials
