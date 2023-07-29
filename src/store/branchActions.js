import axios from '@/plugins/axios'

export default {
  fetchBranches({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`branches`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createBranch({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`branches`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateBranch({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`branches/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchServicesByBranch({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`branches/${queryParams.branchId}/services`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchDriversByBranch({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`branches/${queryParams.branchId}/drivers`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchFreeDriversByBranch({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`branches/${queryParams.branchId}/free-drivers`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
