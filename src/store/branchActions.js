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
  fetchBranchByCompany({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`companies/${queryParams.companyId}/branches`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
