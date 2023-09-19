import axios from '@/plugins/axios'

export default {
  fetchAds({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`adds`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createAds({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`adds`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateAds({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.patch(`adds/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
