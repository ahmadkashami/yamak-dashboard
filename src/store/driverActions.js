import axios from '@/plugins/axios'

export default {
  fetchDrivers({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`driver`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createDriver({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`driver`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateDriver({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`driver/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
