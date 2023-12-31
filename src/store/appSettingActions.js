import axios from '@/plugins/axios'

export default {
  fetchAppSetting({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`app-setting`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createAppSetting({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`app-setting`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateAppSetting({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`app-setting/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
