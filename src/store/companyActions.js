import axios from '@/plugins/axios'

export default {
  fetchCompanies({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`companies`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createCompany({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`companies`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateCompany({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`companies/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchDriversByCompany({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`companies/${queryParams.companyId}/drivers`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
