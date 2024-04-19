import axios from '@/plugins/axios'

export default {
  fetchAppUsers({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`app-users`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchAppRequests({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`requests`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
