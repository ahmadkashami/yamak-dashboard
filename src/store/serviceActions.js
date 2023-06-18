import axios from '@/plugins/axios'

export default {
  fetchServices({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`services`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createService({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`services`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateService({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`services/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
