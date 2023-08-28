import axios from '@/plugins/axios'

export default {
  fetchWebsites({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`websites`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createWebsite({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`websites`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateWebsite({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`websites/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
