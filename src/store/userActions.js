import axios from '@/plugins/axios'

export default {
  fetchUsers({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`sys-users`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createUser({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`sys-users`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateUser({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`sys-users/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
